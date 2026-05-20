import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { Product } from '../types/product';
import { formatCurrency } from '../utils/currency';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

export default function ProductCard({ product, onPress }: ProductCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress(product)}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Image
        source={{ uri: product.image }}
        resizeMode="contain"
        style={styles.image}
      />
      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.title}>
          {product.title}
        </Text>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.price}>{formatCurrency(product.price)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    borderRadius: 8,
    borderWidth: 1,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
  },
  cardPressed: {
    opacity: 0.75,
  },
  image: {
    backgroundColor: '#f9fafb',
    borderRadius: 6,
    height: 92,
    width: 92,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 12,
  },
  title: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 21,
  },
  category: {
    color: '#6b7280',
    fontSize: 13,
    marginTop: 6,
    textTransform: 'capitalize',
  },
  price: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
  },
});
