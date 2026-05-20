# React Native Product App Assessment

This project is a React Native take-home assessment app built with Expo and the Fake Store API. It demonstrates API integration, stack/tab navigation, reusable components, global cart state, loading/error/empty states, and concise documentation.

## Tech Stack

- TypeScript
- Expo React Native
- React Navigation: native stack plus bottom tabs
- Redux Toolkit and React Redux
- Axios
- npm

Expo was chosen because it keeps the local setup fast and reliable without requiring native Android or iOS project configuration. Redux Toolkit was chosen for the cart because cart data is shared between Product Detail, Cart, and the tab badge, and selectors keep totals and item counts centralized.

## Features

- Product list from `GET /products`
- Category filter from `GET /products/categories`
- Category-specific products from `GET /products/category/{name}`
- Product detail from `GET /products/{id}`
- Add to cart with an already-in-cart visual state
- Cart quantity increase/decrease, item removal, clear cart, and dynamic total
- Search screen that filters already fetched products locally
- Reusable product card, cart item, category filter, loading, error, empty, and icon components

## API

Base URL: `https://fakestoreapi.com`

- `GET /products`
- `GET /products/{id}`
- `GET /products/categories`
- `GET /products/category/{name}`

## Project Structure

```text
apps/mobile/
  redux/
    cartSlice.ts
    hooks.ts
    store.ts
  src/
    api/
    components/
    hooks/
    navigation/
    screens/
    types/
    utils/
```

The root `App.tsx` renders `apps/mobile/src/App.tsx`, where Redux and React Navigation are configured.

## Setup

```bash
npm install
npm start
```

Run on a platform:

```bash
npm run android
npm run ios
npm run web
```

For Expo Go, run `npm start` and scan the QR code. For an emulator, start the emulator first and choose the Android or iOS option from the Expo terminal.

## Validation

TypeScript check:

```bash
.\node_modules\.bin\tsc.cmd --noEmit
```

On this Windows machine, direct `npx` execution may be blocked by PowerShell execution policy, so local `.cmd` binaries and npm scripts are preferred.

## Notes

- Product data and categories are not hardcoded.
- Product Detail adds a product once with quantity `1`; quantity is managed from Cart.
- Search filters product titles locally and does not call the API while typing.
- Written concept answers and debugging solutions are in `answers.md`.
