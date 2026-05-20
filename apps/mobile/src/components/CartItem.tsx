import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { CartItem as CartItemType } from '../types/product';
import { formatCurrency } from '../utils/currency';

interface CartItemProps {
  item: CartItemType;
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
  onRemove: (productId: number) => void;
}

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  const isDecreaseDisabled = item.quantity <= 1;

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Text numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>
        <Text style={styles.price}>{formatCurrency(item.price)}</Text>
        <Text style={styles.subtotal}>
          Subtotal {formatCurrency(item.price * item.quantity)}
        </Text>
      </View>
      <View style={styles.actions}>
        <View style={styles.quantityRow}>
          <Pressable
            accessibilityRole="button"
            disabled={isDecreaseDisabled}
            onPress={() => onDecrease(item.id)}
            style={({ pressed }) => [
              styles.quantityButton,
              isDecreaseDisabled && styles.disabledButton,
              pressed && !isDecreaseDisabled && styles.pressedButton,
            ]}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </Pressable>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => onIncrease(item.id)}
            style={({ pressed }) => [
              styles.quantityButton,
              pressed && styles.pressedButton,
            ]}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </Pressable>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => onRemove(item.id)}
          style={({ pressed }) => [styles.removeButton, pressed && styles.pressedButton]}
        >
          <Text style={styles.removeText}>Remove</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 14,
  },
  details: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
  },
  price: {
    color: '#2563eb',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 8,
  },
  subtotal: {
    color: '#6b7280',
    fontSize: 13,
    marginTop: 4,
  },
  actions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  quantityRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  quantityButton: {
    alignItems: 'center',
    backgroundColor: '#e5efff',
    borderRadius: 6,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  disabledButton: {
    backgroundColor: '#f3f4f6',
  },
  pressedButton: {
    opacity: 0.75,
  },
  quantityButtonText: {
    color: '#1d4ed8',
    fontSize: 20,
    fontWeight: '700',
  },
  quantity: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
    minWidth: 34,
    textAlign: 'center',
  },
  removeButton: {
    paddingVertical: 8,
  },
  removeText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '700',
  },
});
