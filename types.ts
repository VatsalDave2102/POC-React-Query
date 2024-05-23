interface Category {
	id: number;
	name: string;
	image: string;
	creationAt: Date;
	updatedAt: Date;
}

export interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	category: Category;
	images: string[];
	creationAt: Date;
	updatedAt: Date;
}

export interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
}
