import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { addToCart, selectIsProductInCart } from '../../../redux/cartSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import EmptyState from '../../components/EmptyState';
import ErrorState from '../../components/ErrorState';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useProductDetail } from '../../hooks/useProductDetail';
import type { ProductDetailScreenProps } from '../../navigation/types';
import { formatCurrency } from '../../utils/currency';

export default function ProductDetailScreen({ route }: ProductDetailScreenProps) {
  const { productId } = route.params;
  const { product, loading, error, refetch } = useProductDetail(productId);
  const dispatch = useAppDispatch();
  const isInCart = useAppSelector(selectIsProductInCart(productId));

  if (loading) {
    return <LoadingSpinner message="Loading product details..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  if (!product) {
    return (
      <EmptyState
        title="Product not found"
        message="This product could not be loaded."
      />
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.imagePanel}>
        <Image source={{ uri: product.image }} resizeMode="contain" style={styles.image} />
      </View>
      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>{formatCurrency(product.price)}</Text>
      <Text style={styles.rating}>
        Rating {product.rating.rate.toFixed(1)} ({product.rating.count} reviews)
      </Text>
      {isInCart ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>In Cart</Text>
        </View>
      ) : null}
      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Pressable
        accessibilityRole="button"
        disabled={isInCart}
        onPress={() => dispatch(addToCart(product))}
        style={({ pressed }) => [
          styles.addButton,
          isInCart && styles.disabledButton,
          pressed && !isInCart && styles.pressedButton,
        ]}
      >
        <Text style={styles.addButtonText}>
          {isInCart ? 'Already in Cart' : 'Add to Cart'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#f8fafc',
    padding: 20,
    paddingBottom: 32,
  },
  imagePanel: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    borderRadius: 8,
    borderWidth: 1,
    height: 260,
    justifyContent: 'center',
    padding: 18,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  category: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 18,
    textTransform: 'capitalize',
  },
  title: {
    color: '#111827',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 31,
    marginTop: 8,
  },
  price: {
    color: '#2563eb',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 12,
  },
  rating: {
    color: '#4b5563',
    fontSize: 15,
    marginTop: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#dcfce7',
    borderRadius: 999,
    marginTop: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    color: '#166534',
    fontSize: 13,
    fontWeight: '800',
  },
  sectionTitle: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 24,
  },
  description: {
    color: '#374151',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 8,
    marginTop: 26,
    paddingVertical: 15,
  },
  disabledButton: {
    backgroundColor: '#9ca3af',
  },
  pressedButton: {
    opacity: 0.8,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
});
