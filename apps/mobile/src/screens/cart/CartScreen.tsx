import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import {
  clearCart,
  removeFromCart,
  selectCartItems,
  selectCartTotal,
  updateQuantity,
} from '../../../redux/cartSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import CartItem from '../../components/CartItem';
import EmptyState from '../../components/EmptyState';
import { formatCurrency } from '../../utils/currency';

export default function CartScreen() {
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const dispatch = useAppDispatch();

  const handleIncrease = (productId: number) => {
    const item = items.find((cartItem) => cartItem.id === productId);

    if (item) {
      dispatch(updateQuantity({ productId, quantity: item.quantity + 1 }));
    }
  };

  const handleDecrease = (productId: number) => {
    const item = items.find((cartItem) => cartItem.id === productId);

    if (item && item.quantity > 1) {
      dispatch(updateQuantity({ productId, quantity: item.quantity - 1 }));
    }
  };

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <EmptyState
          title="Your cart is empty"
          message="Add a product to see it here."
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onDecrease={handleDecrease}
            onIncrease={handleIncrease}
            onRemove={(productId) => dispatch(removeFromCart(productId))}
          />
        )}
      />
      <View style={styles.summary}>
        <View>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => dispatch(clearCart())}
          style={({ pressed }) => [styles.clearButton, pressed && styles.pressedButton]}
        >
          <Text style={styles.clearButtonText}>Clear Cart</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8fafc',
    flex: 1,
  },
  emptyContainer: {
    backgroundColor: '#f8fafc',
    flex: 1,
    justifyContent: 'center',
  },
  listContent: {
    paddingVertical: 8,
  },
  summary: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopColor: '#e5e7eb',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  totalLabel: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '700',
  },
  totalValue: {
    color: '#111827',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 2,
  },
  clearButton: {
    backgroundColor: '#dc2626',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  pressedButton: {
    opacity: 0.8,
  },
  clearButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
});
