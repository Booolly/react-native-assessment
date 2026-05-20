import { StyleSheet, Text, View } from 'react-native';

import type { ProductDetailScreenProps } from '../../navigation/types';

export default function ProductDetailScreen({ route }: ProductDetailScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Detail</Text>
      <Text style={styles.message}>Product ID: {route.params.productId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: '#111827',
    fontSize: 22,
    fontWeight: '700',
  },
  message: {
    color: '#6b7280',
    fontSize: 15,
    marginTop: 8,
    textAlign: 'center',
  },
});
