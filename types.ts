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

export interface User {
	id: number;
	email: string;
	password: string;
	name: string;
	role: string;
	avatar: string;
}

export interface Album {
	userId: number;
	id: number;
	title: string;
}
