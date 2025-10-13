# Project Structure - Visual Guide

## 📂 Complete File Tree

```
bahri-line-main-v2/
│
├── 📁 src/
│   │
│   ├── 📁 app/                          # Next.js App Router
│   │   ├── 📁 (locale)/                 # i18n routing
│   │   │   ├── 📁 en/                   # English pages
│   │   │   └── 📁 ar/                   # Arabic pages
│   │   ├── 📁 users/                    # Example feature page
│   │   │   └── page.tsx                 # Users page with full CRUD
│   │   ├── layout.tsx                   # Root layout with providers
│   │   ├── page.tsx                     # Home page
│   │   ├── globals.css                  # Global styles
│   │   └── favicon.ico
│   │
│   ├── 📁 components/                   # UI Components
│   │   ├── 📁 ui/                       # shadcn/ui components
│   │   │   └── (Button, Input, Table, Modal, etc.)
│   │   └── 📁 layout/                   # Layout components
│   │       └── (Header, Footer, Sidebar)
│   │
│   ├── 📁 customhooks/                  # Page-specific hooks (React Query)
│   │   └── useUsersLogic.ts             # Users page logic
│   │       └── (useProductsLogic.ts)    # Example: Products logic
│   │
│   ├── 📁 hooks/                        # Global hooks
│   │   ├── useChangeLanguage.ts         # i18n language switching
│   │   └── useAppLoading.ts             # Global loading state
│   │
│   ├── 📁 services/                     # API Layer
│   │   ├── 📁 api/                      # API Configuration
│   │   │   ├── axiosSetup.ts            # Axios instance + interceptors
│   │   │   ├── axiosRoutes.ts           # API endpoint definitions
│   │   │   └── axiosRoutes.type.ts      # API TypeScript types
│   │   │
│   │   └── 📁 requests/                 # Request/Response Handlers
│   │       ├── req.ts                   # All API requests for entire app
│   │       └── res.ts                   # All API responses for entire app
│   │
│   ├── 📁 types/                        # TypeScript Definitions
│   │   ├── global.d.ts                  # Global types
│   │   ├── user.types.ts                # User types
│   │   └── (product.types.ts, ...)      # Other feature types
│   │
│   ├── 📁 utils/                        # Utility Functions
│   │   ├── handleApiError.ts            # Error handling
│   │   ├── formatDate.ts                # Date formatting
│   │   ├── formatCurrency.ts            # Currency formatting
│   │   └── (validation.ts, ...)         # Other utilities
│   │
│   ├── 📁 providers/                    # React Context Providers
│   │   ├── QueryProvider.tsx            # React Query provider
│   │   ├── ThemeProvider.tsx            # Theme/dark mode provider
│   │   └── (I18nProvider.tsx)           # i18n provider (future)
│   │
│   └── 📁 config/                       # Configuration
│       ├── env.ts                       # Environment variables
│       └── constants.ts                 # App constants
│
├── 📁 public/                           # Static files
│   └── (images, icons, etc.)
│
├── 📄 ARCHITECTURE.md                   # Architecture documentation
├── 📄 MIGRATION_SUMMARY.md              # Migration details
├── 📄 README.md                         # Project README
├── 📄 .env.example                      # Environment template
├── 📄 package.json                      # Dependencies
├── 📄 tsconfig.json                     # TypeScript config
├── 📄 next.config.ts                    # Next.js config
├── 📄 tailwind.config.ts                # Tailwind config
└── 📄 eslint.config.mjs                 # ESLint config
```

## 🔄 Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                       │
│                    (React Components/Pages)                  │
└────────────────────────────┬────────────────────────────────┘
                             │
                             │ uses
                             ↓
┌─────────────────────────────────────────────────────────────┐
│                      CUSTOM HOOKS                            │
│              (customhooks/use<Feature>Logic.ts)              │
│                                                              │
│  - Handles React Query integration                          │
│  - Manages loading/error states                             │
│  - Connects UI to API layer                                 │
└────────────────────────────┬────────────────────────────────┘
                             │
                             │ calls
                             ↓
┌─────────────────────────────────────────────────────────────┐
│                    REQUEST HANDLERS                          │
│                (services/requests/req.ts)                    │
│                                                              │
│  - Constructs API requests                                  │
│  - Uses route definitions                                   │
│  - Type-safe request payloads                               │
└────────────────────────────┬────────────────────────────────┘
                             │
                             │ uses
                             ↓
┌─────────────────────────────────────────────────────────────┐
│                     AXIOS INSTANCE                           │
│              (services/api/axiosSetup.ts)                    │
│                                                              │
│  - HTTP client configuration                                │
│  - Request interceptors (auth tokens)                       │
│  - Response interceptors (error handling)                   │
└────────────────────────────┬────────────────────────────────┘
                             │
                             │ sends HTTP
                             ↓
┌─────────────────────────────────────────────────────────────┐
│                      BACKEND API                             │
│                  (External API Server)                       │
└────────────────────────────┬────────────────────────────────┘
                             │
                             │ returns response
                             ↓
┌─────────────────────────────────────────────────────────────┐
│                   RESPONSE HANDLERS                          │
│                (services/requests/res.ts)                    │
│                                                              │
│  - Processes API responses                                  │
│  - Transforms data if needed                                │
│  - Returns typed data                                       │
└────────────────────────────┬────────────────────────────────┘
                             │
                             │ returns to
                             ↓
┌─────────────────────────────────────────────────────────────┐
│                      CUSTOM HOOKS                            │
│          (React Query caches & manages state)                │
└────────────────────────────┬────────────────────────────────┘
                             │
                             │ provides data to
                             ↓
┌─────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                       │
│                    (Updated with data)                       │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Feature Implementation Flow

### Example: Adding a "Products" Feature

```
Step 1: Define Types
📄 src/types/product.types.ts
   ├── Product interface
   ├── CreateProductDto
   └── ProductsResponse
           ↓

Step 2: Add API Routes
📄 src/services/api/axiosRoutes.ts
   └── PRODUCTS: { BASE, BY_ID, ... }
           ↓

Step 3: Add API Types
📄 src/services/api/axiosRoutes.type.ts
   └── ProductsApiTypes { getAll, create, ... }
           ↓

Step 4: Add Request Handlers
📄 src/services/requests/req.ts (add to existing file)
   └── export const productsRequests { getAll(), create(), ... }
           ↓

Step 5: Add Response Handlers
📄 src/services/requests/res.ts (add to existing file)
   └── export const productsResponses { processList(), ... }
           ↓

Step 6: Create Custom Hook
📄 src/customhooks/useProductsLogic.ts
   └── useProductsLogic() → React Query integration
           ↓

Step 7: Create Page
📄 src/app/products/page.tsx
   └── Uses useProductsLogic() hook
```

## 🔑 Key Files Explained

### 🟢 `services/api/axiosSetup.ts`
- **Purpose**: Configure axios instance
- **Contains**: 
  - Base URL configuration
  - Request interceptors (add auth token)
  - Response interceptors (handle errors)
  - Type-safe API methods (get, post, put, delete)

### 🟢 `services/api/axiosRoutes.ts`
- **Purpose**: Centralize all API endpoints
- **Contains**: Route definitions organized by feature
- **Example**: 
  ```ts
  USERS: {
    BASE: '/users',
    BY_ID: (id) => `/users/${id}`,
  }
  ```

### 🟢 `services/api/axiosRoutes.type.ts`
- **Purpose**: Type definitions for API endpoints
- **Contains**: Request/response types for each endpoint
- **Benefit**: Full type safety for API calls

### 🟢 `services/requests/req.ts`
- **Purpose**: All API request handlers for entire app
- **Contains**: Organized exports for each feature (usersRequests, productsRequests, etc.)
- **Example**: `usersRequests.getAll()`, `productsRequests.create()`, etc.

### 🟢 `services/requests/res.ts`
- **Purpose**: All API response processors for entire app
- **Contains**: Organized exports for each feature (usersResponses, productsResponses, etc.)
- **Example**: `usersResponses.processUser()`, `productsResponses.processList()`, etc.

### 🟢 `customhooks/use<Feature>Logic.ts`
- **Purpose**: Page-specific data fetching logic
- **Contains**: 
  - React Query hooks (useQuery, useMutation)
  - State management
  - Error handling
- **Returns**: Data, loading states, CRUD functions

### 🟢 `types/<feature>.types.ts`
- **Purpose**: TypeScript type definitions
- **Contains**: 
  - Entity interfaces
  - DTO types
  - Response types

### 🟢 `utils/*.ts`
- **Purpose**: Reusable utility functions
- **Examples**: 
  - `handleApiError()` - Error handling
  - `formatDate()` - Date formatting
  - `formatCurrency()` - Money formatting

### 🟢 `config/env.ts`
- **Purpose**: Environment variables
- **Contains**: Type-safe env variable exports
- **Example**: `apiUrl`, `isDevelopment`

### 🟢 `config/constants.ts`
- **Purpose**: App-wide constants
- **Contains**: 
  - API keys
  - Pagination defaults
  - Route paths
  - Status codes

### 🟢 `providers/*.tsx`
- **Purpose**: React context providers
- **Contains**: 
  - `QueryProvider` - React Query setup
  - `ThemeProvider` - Dark mode
  - `I18nProvider` - Internationalization

## 📊 Comparison: Before vs After

### ❌ Before (Old Structure)
```
src/
├── services/
│   ├── apiClient.ts          # Everything in one file
│   └── users.service.ts      # Types + logic mixed
```
**Problems:**
- Poor separation of concerns
- Hard to scale
- Types mixed with logic
- No standardized pattern

### ✅ After (New Structure)
```
src/
├── services/
│   ├── api/
│   │   ├── axiosSetup.ts           # Config only
│   │   ├── axiosRoutes.ts          # Routes only
│   │   └── axiosRoutes.type.ts     # Types only
│   └── requests/
│       ├── req.ts                  # All requests (usersRequests, productsRequests, etc.)
│       └── res.ts                  # All responses (usersResponses, productsResponses, etc.)
├── types/
│   └── user.types.ts               # Types only
├── customhooks/
│   └── useUsersLogic.ts            # React Query logic
```
**Benefits:**
- Clear separation of concerns
- Only 2 files for all requests/responses
- Easy to find all API calls in one place
- Scalable pattern
- Type-safe throughout
- Consistent structure

## 🚀 Quick Reference

### Creating a New Page with Data Fetching

1. **Types**: Create `types/<feature>.types.ts`
2. **Routes**: Add to `services/api/axiosRoutes.ts`
3. **API Types**: Add to `services/api/axiosRoutes.type.ts`
4. **Requests**: Add to `services/requests/req.ts` (export new <feature>Requests)
5. **Responses**: Add to `services/requests/res.ts` (export new <feature>Responses)
6. **Hook**: Create `customhooks/use<Feature>Logic.ts`
7. **Page**: Create `app/<feature>/page.tsx`

### Using a Custom Hook

```tsx
'use client';
import { use<Feature>Logic } from '@/customhooks/use<Feature>Logic';

export default function <Feature>Page() {
  const { data, isLoading, create, update, delete } = use<Feature>Logic();
  
  // Use the data and methods in your component
}
```

## 📝 Notes

- All paths use `@/` alias (mapped to `src/`)
- Files are organized by feature and responsibility
- Custom hooks use React Query for caching
- Error handling is centralized
- Types are shared across the app

---

**This structure ensures scalability, maintainability, and developer productivity!** 🎉
