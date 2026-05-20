import { StyleSheet, Text, View } from 'react-native';

interface IconProps {
  size?: number;
  color?: string;
}

const DEFAULT_ICON_COLOR = '#6b7280';

export function SearchIcon({ size = 20, color = DEFAULT_ICON_COLOR }: IconProps) {
  const circleSize = size * 0.62;
  const strokeWidth = Math.max(2, size * 0.1);

  return (
    <View style={[styles.iconBox, { height: size, width: size }]}>
      <View
        style={[
          styles.searchCircle,
          {
            borderColor: color,
            borderRadius: circleSize / 2,
            borderWidth: strokeWidth,
            height: circleSize,
            width: circleSize,
          },
        ]}
      />
      <View
        style={[
          styles.searchHandle,
          {
            backgroundColor: color,
            height: strokeWidth,
            width: size * 0.42,
          },
        ]}
      />
    </View>
  );
}

export function CartIcon({ size = 20, color = DEFAULT_ICON_COLOR }: IconProps) {
  const strokeWidth = Math.max(2, size * 0.1);
  const wheelSize = Math.max(3, size * 0.16);

  return (
    <View style={[styles.iconBox, { height: size, width: size }]}>
      <View
        style={[
          styles.cartBasket,
          {
            borderBottomWidth: strokeWidth,
            borderColor: color,
            borderLeftWidth: strokeWidth,
            borderRightWidth: strokeWidth,
            borderTopWidth: strokeWidth,
            height: size * 0.42,
            width: size * 0.68,
          },
        ]}
      />
      <View
        style={[
          styles.cartHandle,
          {
            backgroundColor: color,
            height: strokeWidth,
            width: size * 0.28,
          },
        ]}
      />
      <View style={[styles.cartWheel, { backgroundColor: color, height: wheelSize, width: wheelSize }]} />
      <View
        style={[
          styles.cartWheel,
          styles.cartWheelRight,
          { backgroundColor: color, height: wheelSize, width: wheelSize },
        ]}
      />
    </View>
  );
}

export function ProductIcon({ size = 20, color = DEFAULT_ICON_COLOR }: IconProps) {
  const strokeWidth = Math.max(2, size * 0.1);

  return (
    <View style={[styles.iconBox, { height: size, width: size }]}>
      <View
        style={[
          styles.productBox,
          {
            borderColor: color,
            borderRadius: size * 0.12,
            borderWidth: strokeWidth,
            height: size * 0.72,
            width: size * 0.72,
          },
        ]}
      />
      <View
        style={[
          styles.productLine,
          {
            backgroundColor: color,
            height: strokeWidth,
            width: size * 0.46,
          },
        ]}
      />
    </View>
  );
}

export function CloseIcon({ size = 20, color = DEFAULT_ICON_COLOR }: IconProps) {
  return (
    <View
      style={[
        styles.closeCircle,
        {
          borderColor: color,
          borderRadius: size / 2,
          height: size,
          width: size,
        },
      ]}
    >
      <Text style={[styles.closeText, { color, fontSize: size * 0.76 }]}>x</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  iconBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchCircle: {
    left: '14%',
    position: 'absolute',
    top: '10%',
  },
  searchHandle: {
    borderRadius: 999,
    bottom: '18%',
    position: 'absolute',
    right: '10%',
    transform: [{ rotate: '45deg' }],
  },
  cartBasket: {
    borderRadius: 2,
    bottom: '28%',
    position: 'absolute',
    right: '8%',
  },
  cartHandle: {
    borderRadius: 999,
    left: '8%',
    position: 'absolute',
    top: '25%',
    transform: [{ rotate: '20deg' }],
  },
  cartWheel: {
    borderRadius: 999,
    bottom: '10%',
    left: '35%',
    position: 'absolute',
  },
  cartWheelRight: {
    left: '68%',
  },
  productBox: {
    position: 'absolute',
  },
  productLine: {
    borderRadius: 999,
    position: 'absolute',
    top: '33%',
  },
  closeCircle: {
    alignItems: 'center',
    borderWidth: 1.5,
    justifyContent: 'center',
  },
  closeText: {
    fontWeight: '700',
    lineHeight: 18,
    marginTop: -2,
  },
});
