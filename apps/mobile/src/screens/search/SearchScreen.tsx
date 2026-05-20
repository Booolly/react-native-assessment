import { FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useMemo, useState } from 'react';

import EmptyState from '../../components/EmptyState';
import ErrorState from '../../components/ErrorState';
import { CloseIcon, SearchIcon } from '../../components/GeneralIcon';
import LoadingSpinner from '../../components/LoadingSpinner';
import ProductCard from '../../components/ProductCard';
import { useProducts } from '../../hooks/useProducts';
import type { SearchScreenProps } from '../../navigation/types';

export default function SearchScreen({ navigation }: SearchScreenProps) {
  const [query, setQuery] = useState('');
  const { products, loading, error, refetch } = useProducts();

  const matchingProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return products;
    }

    return products.filter((product) =>
      product.title.toLowerCase().includes(normalizedQuery),
    );
  }, [products, query]);

  if (loading && products.length === 0) {
    return <LoadingSpinner message="Loading products..." />;
  }

  if (error && products.length === 0) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchIcon color="#6b7280" size={20} />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setQuery}
          placeholder="Search products"
          placeholderTextColor="#9ca3af"
          style={styles.input}
          value={query}
        />
        {query.length > 0 ? (
          <Pressable
            accessibilityLabel="Clear search"
            accessibilityRole="button"
            onPress={() => setQuery('')}
            style={({ pressed }) => [styles.clearButton, pressed && styles.pressed]}
          >
            <CloseIcon color="#9ca3af" size={20} />
          </Pressable>
        ) : null}
      </View>
      <FlatList
        contentContainerStyle={[
          styles.listContent,
          matchingProducts.length === 0 && styles.emptyContent,
        ]}
        data={matchingProducts}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <EmptyState
            title="No results found"
            message="Try a different product name."
          />
        }
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={(product) =>
              navigation.navigate('Products', {
                screen: 'ProductDetail',
                params: { productId: product.id },
              })
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8fafc',
    flex: 1,
  },
  searchContainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#d1d5db',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    margin: 16,
    paddingHorizontal: 14,
  },
  input: {
    color: '#111827',
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  clearButton: {
    paddingLeft: 6,
    paddingVertical: 8,
  },
  pressed: {
    opacity: 0.7,
  },
  listContent: {
    paddingBottom: 16,
  },
  emptyContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
