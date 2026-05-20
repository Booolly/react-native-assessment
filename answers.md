# Assessment Answers

## Q1. FlatList vs ScrollView

ScrollView renders all of its child content at once, so it is useful for small static screens where the content size is predictable. FlatList is designed for repeated list data and virtualizes rows, meaning it renders the visible items plus a small buffer instead of the entire list. I used FlatList for product and cart lists because API data can grow and list performance matters on mobile devices. I used ScrollView only on Product Detail because it displays one product with a fixed set of fields. Using ScrollView for a large product list would waste memory and can make rendering slower.

## Q2. Redux Toolkit Choice and Trade-offs

Redux Toolkit was chosen because cart state is shared across Product Detail, Cart, and the cart tab badge. It gives clear actions, reducers, and selectors with less boilerplate than traditional Redux. Context API could work for a very small app, but frequent updates can cause unnecessary re-renders if the context is not split carefully. Redux Toolkit also keeps total calculation and in-cart checks centralized instead of duplicating business logic across screens. If the app grew to 20+ screens with more shared state, Redux Toolkit would still be the stronger choice.

## Q3. React Native Bridge and New Architecture

The traditional React Native bridge is the communication layer between JavaScript and native code. It serializes messages across the boundary, and heavy traffic through the bridge can affect performance in animation-heavy or native-module-heavy features. JSI improves this by letting JavaScript interact with native objects more directly. Fabric updates the rendering system, and TurboModules make native modules load and communicate more efficiently. In practice, developers can see faster startup for native modules, smoother UI updates, and fewer bottlenecks in complex screens.

## Q4. Offline Support Strategy

For offline support, I would cache the last successful products, categories, and viewed product details so users can still browse recent data without internet. A practical implementation would use async-storage for cached API responses and netinfo to detect connectivity changes. For a larger app, React Query with persistence would help manage stale data, retries, background refresh, and cache invalidation. Cart state should also be persisted locally because users expect selected items to remain after closing the app or losing connection. I would prioritize caching product list data, categories, viewed product details, and cart items.

## Debugging Challenge

### Bug 1

Issue: The fetch request runs directly inside the component body, so it runs on every render. When `setProducts` updates state, React renders again and triggers another fetch, which can create a request loop. The code also lacks loading/error handling and should provide a stable `keyExtractor` for `FlatList`. The request should run inside `useEffect` so it happens when the component mounts.

Corrected code:

```tsx
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch {
        setError('Unable to load products.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>{error}</Text>;

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <Text>{item.title}</Text>}
    />
  );
};
```

### Bug 2

Issue: `ScrollView` renders every cart item immediately, which is not ideal for a cart list that can grow. The mapped `Text` elements also need stable keys, and the selector should match the actual Redux state shape. `FlatList` is preferred because it virtualizes rows and provides `keyExtractor`. This keeps the cart list more performant and easier to maintain.

Corrected code:

```tsx
const CartScreen = () => {
  const cart = useSelector((state) => state.cart.items);

  return (
    <FlatList
      data={cart}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Text>
          {item.title} - ${item.price}
        </Text>
      )}
    />
  );
};
```

### Bug 3

Issue: `useSelector` and `useDispatch` are React hooks, so they cannot be called inside a normal function. Hooks must be called inside a React component or a custom hook so React can preserve hook order. Dispatching cart actions should happen from a component event handler or from a custom hook that returns a handler function. This keeps the code compatible with React's hook rules.

Corrected code:

```tsx
const ProductDetail = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const isInCart = cart.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch({ type: 'cart/addToCart', payload: product });
  };

  return (
    <Button
      title={isInCart ? 'In Cart' : 'Add to Cart'}
      disabled={isInCart}
      onPress={handleAddToCart}
    />
  );
};
```
