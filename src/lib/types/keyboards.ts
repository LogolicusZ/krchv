// keyboard type
interface Keyboard {
	id: string;
	name: string;
	designer: Designer | string;
	material: Material;
	keycaps: Keycaps;
	switches: Switches;
	notes: string;
	status: string;
	images: Images[];
}

// designer type
interface Designer {
	name: string;
	url: string;
	// picture: string;
}

// material (finish, color, etc.) type
interface Material {
	finish: string;
	color: string;
}

// keycaps type
interface Keycaps {
	name: string;
	url: string;
}

// switches type
interface Switches {
	name: string;
	url: string;
}

// images array type
interface Images {
	alt: string;
	src: string;
}

// export interfaces as types
export type { Keyboard, Designer, Material, Keycaps, Switches };
