/**
 * Minimal intrinsic-dimension reader for the image formats used in `static/`.
 *
 * Replaces the `image-size` package, which has no patched release for
 * GHSA-level DoS advisories in its ICNS/JXL/HEIF parsers (unbounded loops on
 * zero-length boxes). Every loop here advances by a strictly positive amount or
 * bails out, so a malformed file yields an error rather than a hang.
 */

type Dimensions = { width: number; height: number };

const PNG_SIGNATURE = "\x89PNG\r\n\x1a\n";

/** ISOBMFF brands that carry their size in an `ispe` box (AVIF / HEIF / HEIC). */
const ISOBMFF_BRANDS = new Set(["avif", "avis", "mif1", "msf1", "heic", "heix", "hevc", "hevx"]);

function ascii(buf: Buffer, start: number, end: number): string {
  return buf.subarray(start, end).toString("binary");
}

/**
 * Walk the sibling boxes starting at `offset` looking for `name`, descending no
 * further than the given `end`. Returns the box header offset and its size.
 */
function findBox(
  buf: Buffer,
  name: string,
  offset: number,
  end: number = buf.length
): { offset: number; size: number } | undefined {
  while (offset + 8 <= end) {
    let size = buf.readUInt32BE(offset);
    if (size === 0) {
      // Per ISO/IEC 14496-12 a declared size of 0 means "runs to the end".
      size = end - offset;
    } else if (size === 1) {
      // 64-bit largesize follows the header. Bail out rather than risk a
      // precision-losing read; nothing we parse needs a >4GiB box.
      if (offset + 16 > end || buf.readUInt32BE(offset + 8) !== 0) return undefined;
      size = buf.readUInt32BE(offset + 12);
    }
    // A box must be at least its own 8-byte header and must fit in the buffer;
    // anything else means the file is truncated or lying about its layout.
    if (size < 8 || offset + size > end) return undefined;
    if (ascii(buf, offset + 4, offset + 8) === name) return { offset, size };
    offset += size;
  }
  return undefined;
}

function pngDimensions(buf: Buffer): Dimensions {
  if (buf.length < 24 || ascii(buf, 12, 16) !== "IHDR") {
    throw new TypeError("Invalid PNG: no IHDR chunk");
  }
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function isobmffDimensions(buf: Buffer): Dimensions {
  const meta = findBox(buf, "meta", 0);
  // `meta` is a FullBox: 8-byte header + 4 bytes of version/flags.
  const iprp = meta && findBox(buf, "iprp", meta.offset + 12, meta.offset + meta.size);
  const ipco = iprp && findBox(buf, "ipco", iprp.offset + 8, iprp.offset + iprp.size);
  if (!ipco) throw new TypeError("Invalid HEIF/AVIF: no ipco box");

  const ipcoEnd = ipco.offset + ipco.size;
  const ispe = findBox(buf, "ispe", ipco.offset + 8, ipcoEnd);
  if (!ispe || ispe.size < 20) throw new TypeError("Invalid HEIF/AVIF: no ispe box");

  const width = buf.readUInt32BE(ispe.offset + 12);
  const height = buf.readUInt32BE(ispe.offset + 16);

  // A clean aperture box crops the stored image; mirror image-size and subtract
  // the right-hand crop so existing dimensions stay stable.
  const clap = findBox(buf, "clap", ipco.offset + 8, ipcoEnd);
  if (clap && clap.size >= 16) {
    return { width: width - buf.readUInt32BE(clap.offset + 12), height };
  }
  return { width, height };
}

function jpegDimensions(buf: Buffer): Dimensions {
  let offset = 2; // skip SOI
  while (offset + 4 <= buf.length) {
    if (buf[offset] !== 0xff) throw new TypeError("Invalid JPEG: lost marker sync");
    const marker = buf[offset + 1];
    const length = buf.readUInt16BE(offset + 2);
    if (length < 2) throw new TypeError("Invalid JPEG: zero-length segment");
    // SOF0-SOF15, excluding DHT (c4), JPG (c8) and DAC (cc).
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      if (offset + 9 > buf.length) break;
      return { width: buf.readUInt16BE(offset + 7), height: buf.readUInt16BE(offset + 5) };
    }
    offset += 2 + length;
  }
  throw new TypeError("Invalid JPEG: no SOF marker");
}

/**
 * Read the intrinsic pixel dimensions of an image buffer.
 * Throws for malformed input or a format this reader doesn't cover.
 */
export function readImageDimensions(buf: Buffer): Dimensions {
  if (buf.length >= 24 && ascii(buf, 0, 8) === PNG_SIGNATURE) {
    return pngDimensions(buf);
  }
  if (buf.length >= 16 && ascii(buf, 4, 8) === "ftyp") {
    const brand = ascii(buf, 8, 12);
    if (ISOBMFF_BRANDS.has(brand)) return isobmffDimensions(buf);
    throw new TypeError(`Unsupported ISOBMFF brand: ${brand}`);
  }
  if (buf.length >= 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    return jpegDimensions(buf);
  }
  throw new TypeError("Unsupported image format");
}
