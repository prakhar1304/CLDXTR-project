import axios, { AxiosError, isAxiosError } from "axios";

const usersClient = axios.create({ baseURL: "https://jsonplaceholder.typicode.com" });
const productsClient = axios.create({ baseURL: "https://fakestoreapi.com" });

function toMessage(error: unknown, fallback: string) {
  if (isAxiosError(error)) {
    const ax = error as AxiosError;
    const status = ax.response?.status;
    const statusText = ax.response?.statusText;
    return status ? `${fallback} (${status}${statusText ? ` ${statusText}` : ""})` : fallback;
  }
  if (error instanceof Error) return error.message;
  return fallback;
}

export type ApiUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address?: {
    street?: string;
    suite?: string;
    city?: string;
    zipcode?: string;
  };
  company?: { name?: string };
};

export type ApiProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: { rate: number; count: number };
};

export type CreateProductInput = {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export async function fetchUsers(): Promise<ApiUser[]> {
  try {
    const res = await usersClient.get<ApiUser[]>("/users");
    return res.data;
  } catch (e) {
    throw new Error(toMessage(e, "Failed to load users"));
  }
}

export async function fetchUserById(id: number): Promise<ApiUser> {
  try {
    const res = await usersClient.get<ApiUser>(`/users/${id}`);
    return res.data;
  } catch (e) {
    throw new Error(toMessage(e, "Failed to load user"));
  }
}

export async function fetchProducts(): Promise<ApiProduct[]> {
  try {
    const res = await productsClient.get<ApiProduct[]>("/products");
    return res.data;
  } catch (e) {
    throw new Error(toMessage(e, "Failed to load products"));
  }
}

export async function fetchProductById(id: number): Promise<ApiProduct> {
  try {
    const res = await productsClient.get<ApiProduct>(`/products/${id}`);
    return res.data;
  } catch (e) {
    throw new Error(toMessage(e, "Failed to load product"));
  }
}

export async function addProduct(input: CreateProductInput): Promise<ApiProduct> {
  try {
    const res = await productsClient.post<ApiProduct>("/products", input, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (e) {
    throw new Error(toMessage(e, "Failed to add product"));
  }
}

