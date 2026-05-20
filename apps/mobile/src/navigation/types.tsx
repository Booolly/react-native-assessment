import type { NavigatorScreenParams } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type ProductStackParamList = {
  ProductList: undefined;
  ProductDetail: {
    productId: number;
  };
};

export type RootTabParamList = {
  Products: NavigatorScreenParams<ProductStackParamList>;
  Cart: undefined;
  Search: undefined;
};

export type ProductListScreenProps = NativeStackScreenProps<
  ProductStackParamList,
  'ProductList'
>;

export type ProductDetailScreenProps = NativeStackScreenProps<
  ProductStackParamList,
  'ProductDetail'
>;

export type CartScreenProps = BottomTabScreenProps<RootTabParamList, 'Cart'>;
export type SearchScreenProps = BottomTabScreenProps<RootTabParamList, 'Search'>;
