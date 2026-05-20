import { useCallback, useEffect, useState } from 'react';

import { getProducts, getProductsByCategory } from '../api/product_Api';
import type { Product } from '../types/product';

const ALL_CATEGORIES = 'All';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const nextProducts =
        selectedCategory === ALL_CATEGORIES
          ? await getProducts()
          : await getProductsByCategory(selectedCategory);

      setProducts(nextProducts);
    } catch (fetchError) {
      const message =
        fetchError instanceof Error
          ? fetchError.message
          : 'Unable to load products. Please try again.';

      setProducts([]);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    refetch: fetchProducts,
  };
}
