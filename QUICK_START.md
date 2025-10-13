# Quick Start Guide - Simplified Structure

## 📦 Simplified Request/Response Structure

Instead of creating separate files for each feature, we now use **just 2 files** for ALL API requests and responses:

```
src/services/requests/
├── req.ts    # All API requests for entire app
└── res.ts    # All API responses for entire app
```

## 🚀 How It Works

### `src/services/requests/req.ts`
This file contains ALL request handlers organized by feature:

```typescript
// Users Requests
export const usersRequests = {
  getAll: async (params) => api.get('/users', { params }),
  getById: async (id) => api.get(`/users/${id}`),
  create: async (data) => api.post('/users', data),
  // ... more user requests
};

// Products Requests (add when needed)
export const productsRequests = {
  getAll: async () => api.get('/products'),
  getById: async (id) => api.get(`/products/${id}`),
  // ... more product requests
};

// Add more features here...
```

### `src/services/requests/res.ts`
This file contains ALL response handlers organized by feature:

```typescript
// Users Responses
export const usersResponses = {
  processUser: (response) => response.data,
  processGetAll: (response) => response.data,
  // ... more user response processors
};

// Products Responses (add when needed)
export const productsResponses = {
  processProduct: (response) => response.data,
  processList: (response) => response.data,
  // ... more product response processors
};

// Add more features here...
```

## ✅ Benefits

1. **Simple**: Only 2 files to manage instead of N×2 files (where N = number of features)
2. **Centralized**: All API calls in one place - easy to find and review
3. **Organized**: Still separated by feature with clear exports
4. **Scalable**: Just add new exports for new features
5. **Import-friendly**: Single import location for all features

## 📝 Adding a New Feature (e.g., "Products")

### Step 1: Create Types
**File**: `src/types/product.types.ts`
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

### Step 2: Add API Routes
**File**: `src/services/api/axiosRoutes.ts`
```typescript
export const API_ROUTES = {
  // ... existing routes
  PRODUCTS: {
    BASE: '/products',
    BY_ID: (id: number) => `/products/${id}`,
  },
};
```

### Step 3: Add API Types
**File**: `src/services/api/axiosRoutes.type.ts`
```typescript
export interface ProductsApiTypes {
  getAll: {
    response: Product[];
  };
  getById: {
    params: { id: number };
    response: Product;
  };
  create: {
    body: CreateProductDto;
    response: Product;
  };
}
```

### Step 4: Add Requests
**File**: `src/services/requests/req.ts` *(add to existing file)*
```typescript
// Add this export at the bottom
export const productsRequests = {
  getAll: async () => {
    return api.get<ProductsApiTypes['getAll']['response']>(
      API_ROUTES.PRODUCTS.BASE
    );
  },

  getById: async (id: number) => {
    return api.get<ProductsApiTypes['getById']['response']>(
      API_ROUTES.PRODUCTS.BY_ID(id)
    );
  },

  create: async (data: ProductsApiTypes['create']['body']) => {
    return api.post<ProductsApiTypes['create']['response']>(
      API_ROUTES.PRODUCTS.BASE,
      data
    );
  },
};
```

### Step 5: Add Responses
**File**: `src/services/requests/res.ts` *(add to existing file)*
```typescript
// Add this export at the bottom
export const productsResponses = {
  processList: (response: AxiosResponse<Product[]>): Product[] => {
    return response.data;
  },

  processProduct: (response: AxiosResponse<Product>): Product => {
    return response.data;
  },
};
```

### Step 6: Create Custom Hook
**File**: `src/customhooks/useProductsLogic.ts`
```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
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

  return {
    products: data || [],
    isLoading,
  };
};
```

### Step 7: Use in Page
**File**: `src/app/products/page.tsx`
```typescript
'use client';
import { useProductsLogic } from '@/customhooks/useProductsLogic';

export default function ProductsPage() {
  const { products, isLoading } = useProductsLogic();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Products</h1>
      {products.map(product => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}
```

## 📋 Checklist for New Features

- [ ] Create `types/<feature>.types.ts`
- [ ] Add routes to `services/api/axiosRoutes.ts`
- [ ] Add types to `services/api/axiosRoutes.type.ts`
- [ ] Add `<feature>Requests` export to `services/requests/req.ts`
- [ ] Add `<feature>Responses` export to `services/requests/res.ts`
- [ ] Create `customhooks/use<Feature>Logic.ts`
- [ ] Create `app/<feature>/page.tsx`

## 🎯 Import Pattern

When using in custom hooks:

```typescript
// ✅ Correct - Import from the centralized files
import { usersRequests, productsRequests } from '@/services/requests/req';
import { usersResponses, productsResponses } from '@/services/requests/res';

// ❌ Incorrect - Don't create separate files
import { usersRequests } from '@/services/requests/users.req';
```

## 🔍 Finding API Calls

Need to find all API calls? Just open:
- **Requests**: `src/services/requests/req.ts`
- **Responses**: `src/services/requests/res.ts`

Everything is in one place! 🎉

## 📂 Complete Structure Reference

```
src/
├── app/                          # Next.js pages
├── components/
│   ├── ui/                       # shadcn/ui components
│   └── layout/                   # Header, Footer, Sidebar
├── customhooks/                  # Page-specific hooks
│   ├── useUsersLogic.ts
│   └── useProductsLogic.ts
├── hooks/                        # Global hooks
│   ├── useChangeLanguage.ts
│   └── useAppLoading.ts
├── services/
│   ├── api/
│   │   ├── axiosSetup.ts        # Axios config
│   │   ├── axiosRoutes.ts       # API routes
│   │   └── axiosRoutes.type.ts  # API types
│   └── requests/
│       ├── req.ts               # ⭐ All requests
│       └── res.ts               # ⭐ All responses
├── types/                        # TypeScript types
│   ├── global.d.ts
│   ├── user.types.ts
│   └── product.types.ts
├── utils/                        # Utilities
├── providers/                    # React providers
└── config/                       # Configuration
```

---

## 🔐 Authentication System

The project includes a complete authentication system with **shadcn-ui**, **React Hook Form**, and **Zod**.

### Login Page

Visit `/login` to see the authentication system in action.

**Structure:**
- **Schema**: `src/schemas/auth.schema.ts` - Zod validation
- **Custom Hook**: `src/customhooks/useLoginLogic.ts` - RHF + API logic
- **Page**: `src/app/login/page.tsx` - UI with shadcn-ui components

**Example:**
```typescript
import { useLoginLogic } from '@/customhooks/useLoginLogic';

const { form, onSubmit, isLoading } = useLoginLogic();
```

See [LOGIN_IMPLEMENTATION.md](LOGIN_IMPLEMENTATION.md) for complete details.

---

**That's it! Simple, clean, and scalable.** 🚀

