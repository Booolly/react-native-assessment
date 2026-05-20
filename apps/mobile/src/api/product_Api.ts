import axios, { AxiosError } from 'axios';

import type { Product } from '../types/product';

const apiClient = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
});

function getErrorMessage(error: unknown, fallbackMessage: string): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 404) {
      return 'Product details could not be found.';
    }

    if (axiosError.code === 'ECONNABORTED') {
      return 'The request timed out. Please try again.';
    }

    if (!axiosError.response) {
      return 'Unable to connect. Please check your internet connection.';
    }
  }

  return fallbackMessage;
}

function assertProduct(product: Product | null | undefined): Product {
  if (!product || typeof product.id !== 'number') {
    throw new Error('Product details could not be found.');
  }

  return product;
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await apiClient.get<Product[]>('/products');
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Unable to load products. Please try again.'));
  }
}

export async function getProductById(id: number): Promise<Product> {
  if (!Number.isFinite(id) || id <= 0) {
    throw new Error('Product details could not be found.');
  }

  try {
    const response = await apiClient.get<Product | null>(`/products/${id}`);
    return assertProduct(response.data);
  } catch (error) {
    if (error instanceof Error && error.message === 'Product details could not be found.') {
      throw error;
    }

    throw new Error(
      getErrorMessage(error, 'Unable to load product details. Please try again.'),
    );
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const response = await apiClient.get<string[]>('/products/categories');
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    throw new Error(
      getErrorMessage(error, 'Unable to load categories. Please try again.'),
    );
  }
}

export async function getProductsByCategory(name: string): Promise<Product[]> {
  const category = name.trim();

  if (!category) {
    return getProducts();
  }

  try {
    const response = await apiClient.get<Product[]>(
      `/products/category/${encodeURIComponent(category)}`,
    );
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    throw new Error(
      getErrorMessage(error, 'Unable to load products for this category. Please try again.'),
    );
  }
}
