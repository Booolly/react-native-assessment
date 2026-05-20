import { useCallback, useEffect, useState } from 'react';

import { getProductById } from '../api/product_Api';
import type { Product } from '../types/product';

export function useProductDetail(productId: number) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const nextProduct = await getProductById(productId);
      setProduct(nextProduct);
    } catch (fetchError) {
      const message =
        fetchError instanceof Error
          ? fetchError.message
          : 'Unable to load product details. Please try again.';

      setProduct(null);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    void fetchProduct();
  }, [fetchProduct]);

  return {
    product,
    loading,
    error,
    refetch: fetchProduct,
  };
}
