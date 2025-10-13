# Project Architecture

This document describes the folder structure and code organization for this Next.js application.

## 📁 Folder Structure

```
src/
│
├── app/
│   ├── (locale)/          # Built-in Next.js i18n routing (e.g., en, ar)
│   ├── layout.tsx         # Root layout using shadcn/ui and shared components
│   └── page.tsx           # Home page
│
├── components/
│   ├── ui/                # Reusable UI components from shadcn/ui
│   │                      # (Button, Input, Table, Modal, etc.)
│   └── layout/            # Shared sections (Header, Footer, Sidebar)
│
├── hooks/
│   ├── useChangeLanguage.ts   # Language switching hook
│   ├── useAppLoading.ts       # Global loading state
│   └── (other global state logic)
│
├── services/
│   ├── api/
│   │   ├── axiosSetup.ts          # Create and export axios instance
│   │   ├── axiosRoutes.ts         # Define API route endpoints
│   │   └── axiosRoutes.type.ts    # TypeScript types for API endpoints
│   │
│   └── requests/                  # API request & response handlers
│       ├── req.ts                 # All API requests for entire app
│       └── res.ts                 # All API responses for entire app
│
├── customhooks/
│   └── use<PageName>Logic.ts      # Custom hook for each page
│                                  # Handles fetching with React Query
│                                  # Connects UI to API
│
├── utils/
│   ├── formatDate.ts              # Date formatting utilities
│   ├── formatCurrency.ts          # Currency formatting utilities
│   ├── handleApiError.ts          # Error handling utilities
│   └── (other reusable helper functions)
│
├── types/
│   ├── global.d.ts                # Global types/interfaces
│   └── *.types.ts                 # Feature-specific types
│
├── providers/
│   ├── QueryProvider.tsx          # React Query setup
│   ├── ThemeProvider.tsx          # shadcn/ui + next-themes integration
│   └── I18nProvider.tsx           # next-i18n routing wrapper
│
└── config/
    ├── env.ts                     # Environment variables (base URLs, etc.)
    └── constants.ts               # Static constants used globally
```

## 🔧 How to Use This Structure

### 1. Creating a New Feature (e.g., "Products")

#### Step 1: Define Types
Create `src/types/product.types.ts`:
```typescript
export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface CreateProductDto {
  name: string;
  price: number;
}
```

#### Step 2: Add API Routes
Update `src/services/api/axiosRoutes.ts`:
```typescript
export const API_ROUTES = {
  PRODUCTS: {
    BASE: '/products',
    BY_ID: (id: number) => \`/products/\${id}\`,
  },
  // ...
};
```

#### Step 3: Add API Types
Update `src/services/api/axiosRoutes.type.ts`:
```typescript
export interface ProductsApiTypes {
  getAll: {
    response: Product[];
  };
  // ...
}
```

#### Step 4: Add Request Handlers
Add to `src/services/requests/req.ts`:
```typescript
export const productsRequests = {
  getAll: async () => {
    return api.get(API_ROUTES.PRODUCTS.BASE);
  },
  getById: async (id: number) => {
    return api.get(API_ROUTES.PRODUCTS.BY_ID(id));
  },
  // ... more requests
};
```

#### Step 5: Add Response Handlers
Add to `src/services/requests/res.ts`:
```typescript
export const productsResponses = {
  processList: (response: AxiosResponse<Product[]>) => response.data,
  processProduct: (response: AxiosResponse<Product>) => response.data,
  // ... more response handlers
};
```

#### Step 6: Create Custom Hook
Create `src/customhooks/useProductsLogic.ts`:
```typescript
import { useQuery } from '@tanstack/react-query';
import { productsRequests } from '@/services/requests/req';
import { productsResponses } from '@/services/requests/res';

export const useProductsLogic = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await productsRequests.getAll();
      return productsResponses.processList(response);
    },
  });

  return { products: data || [], isLoading };
};
```

#### Step 7: Use in a Page
Create `src/app/products/page.tsx`:
```typescript
'use client';
import { useProductsLogic } from '@/customhooks/useProductsLogic';

export default function ProductsPage() {
  const { products, isLoading } = useProductsLogic();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### 2. Adding UI Components (shadcn/ui)

Place shadcn/ui components in `src/components/ui/`:
- `Button.tsx`
- `Input.tsx`
- `Table.tsx`
- `Modal.tsx`
- etc.

### 3. Adding Layout Components

Place shared layout components in `src/components/layout/`:
- `Header.tsx`
- `Footer.tsx`
- `Sidebar.tsx`
- etc.

### 4. Adding Global Hooks

Place global state logic in `src/hooks/`:
- `useAuth.ts`
- `useTheme.ts`
- `useLocale.ts`
- etc.

### 5. Adding Utilities

Place helper functions in `src/utils/`:
- `formatDate.ts`
- `formatCurrency.ts`
- `validation.ts`
- etc.

## 🌐 Internationalization (i18n)

Use the `(locale)` folder for locale-specific pages:

```
src/app/(locale)/
├── en/
│   └── products/
│       └── page.tsx
└── ar/
    └── products/
        └── page.tsx
```

Access using routes: `/en/products` or `/ar/products`

## 🎨 Styling

- Uses **Tailwind CSS** for styling
- **shadcn/ui** for pre-built components
- **next-themes** for dark mode support

## 📦 State Management

- **React Query** (@tanstack/react-query) for server state
- Custom hooks for local UI state
- Context API for global client state (if needed)

## 🔑 Key Principles

1. **Separation of Concerns**: API logic separate from UI logic
2. **Type Safety**: TypeScript types for all API requests/responses
3. **Reusability**: Custom hooks for page-specific logic
4. **Consistency**: Follow the folder structure for all features
5. **Scalability**: Easy to add new features following the same pattern

## 🚀 Getting Started

1. Install dependencies: `npm install`
2. Set up environment variables in `.env.local`
3. Run development server: `npm run dev`
4. Follow the structure when creating new features

## 📚 Example: Users Feature

The Users feature is already implemented as a reference:
- Types: `src/types/user.types.ts`
- API Routes: `src/services/api/axiosRoutes.ts`
- Requests: `src/services/requests/users.req.ts`
- Responses: `src/services/requests/users.res.ts`
- Custom Hook: `src/customhooks/useUsersLogic.ts`

Use this as a template for implementing new features!

