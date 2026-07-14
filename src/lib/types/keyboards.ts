// keyboard type
interface Keyboard {
  id: string;
  name: string;
  designer: Designer | string;
  material: Material;
  keycaps: Keycap;
  switches: Switches;
  notes: string;
  status: string;
  images: Image[];
  soundtest: string;
}

// artisan type
interface Artisan {
  id: string;
  name: string;
  maker: string;
  sculpt: string;
  colorway: string;
  status: string;
  notes: string;
  images: Image[];
}

// designer type
interface Designer {
  id: string;
  name: string;
  url: string;
  picture: Image;
}

// material (finish, color, etc.) type
interface Material {
  finish: string;
  color: string;
}

// keycaps type
interface Keycap {
  id: string;
  name: string;
  kits: string;
}

// switches type
interface Switches {
  id: string;
  name: string;
  amount: string;
}

// images array type
interface Image {
  alt: string;
  src: string;
  width: number;
  height: number;
}

// export interfaces as types
export type { Keyboard, Artisan, Designer, Material, Keycap, Switches, Image };
