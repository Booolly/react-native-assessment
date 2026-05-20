import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';

import CategoryFilter from '../../components/CategoryFilter';
import EmptyState from '../../components/EmptyState';
import ErrorState from '../../components/ErrorState';
import LoadingSpinner from '../../components/LoadingSpinner';
import ProductCard from '../../components/ProductCard';
import { useCategories } from '../../hooks/useCategories';
import { useProducts } from '../../hooks/useProducts';
import type { ProductListScreenProps } from '../../navigation/types';

export default function ProductListScreen({ navigation }: ProductListScreenProps) {
  const {
    products,
    loading: productsLoading,
    error: productsError,
    selectedCategory,
    setSelectedCategory,
    refetch: refetchProducts,
  } = useProducts();
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    refetch: refetchCategories,
  } = useCategories();

  const isInitialLoading = productsLoading && products.length === 0;
  const error = productsError ?? categoriesError;

  const handleRetry = () => {
    void refetchProducts();
    void refetchCategories();
  };

  if (isInitialLoading) {
    return <LoadingSpinner message="Loading products..." />;
  }

  if (error && products.length === 0) {
    return <ErrorState message={error} onRetry={handleRetry} />;
  }

  return (
    <FlatList
      contentContainerStyle={[
        styles.listContent,
        products.length === 0 && styles.emptyContent,
      ]}
      data={products}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={
        <EmptyState
          title="No products found"
          message="Try another category or refresh the product list."
        />
      }
      ListHeaderComponent={
        <View style={styles.header}>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          {categoriesLoading ? (
            <LoadingSpinner message="Loading categories..." />
          ) : null}
          {categoriesError ? (
            <ErrorState message={categoriesError} onRetry={refetchCategories} />
          ) : null}
        </View>
      }
      refreshControl={
        <RefreshControl refreshing={productsLoading} onRefresh={refetchProducts} />
      }
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={(product) =>
            navigation.navigate('ProductDetail', { productId: product.id })
          }
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    backgroundColor: '#f8fafc',
    paddingBottom: 16,
  },
  emptyContent: {
    flex: 1,
  },
  header: {
    backgroundColor: '#f8fafc',
  },
});
