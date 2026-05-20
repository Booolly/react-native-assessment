import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { selectCartItemCount } from '../../redux/cartSlice';
import { useAppSelector } from '../../redux/hooks';
import { CartIcon, ProductIcon, SearchIcon } from '../components/GeneralIcon';
import CartScreen from '../screens/cart/CartScreen';
import SearchScreen from '../screens/search/SearchScreen';
import ProductStackNavigator from './ProductStackNavigator';
import type { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function HomeStackNavigator() {
  const cartItemCount = useAppSelector(selectCartItemCount);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#6b7280',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Products"
        component={ProductStackNavigator}
        options={{
          title: 'Products',
          tabBarLabel: 'Products',
          tabBarIcon: ({ color, size }) => (
            <ProductIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'Cart',
          tabBarLabel: 'Cart',
          tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined,
          tabBarIcon: ({ color, size }) => <CartIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Search',
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <SearchIcon color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
