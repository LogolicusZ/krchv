import DOMPurify from "isomorphic-dompurify";

/** capitalize a word */
export const capitalize = (str: string) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : "");

/** sanitize html */
export function sanitizeHtml(html: string) {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["br", "b", "strong", "i", "em", "mark", "a", "span", "u"],
    ALLOWED_ATTR: ["href", "target", "class", "style"],
  });
}
