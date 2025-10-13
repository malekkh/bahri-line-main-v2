# Bahri Line - Next.js Application

A modern, well-structured Next.js application with TypeScript, React Query, and a clean architecture.

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd bahri-line-main-v2
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API URL:
```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

4. Run the development server
```bash
npm run dev
```

Open [http://localhost:4000](http://localhost:4000) in your browser.

## 📁 Project Structure

This project follows a well-organized folder structure. See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed documentation.

```
src/
├── app/                   # Next.js App Router pages
├── components/            # Reusable UI components
├── customhooks/           # Page-specific custom hooks
├── hooks/                 # Global hooks
├── services/              # API configuration and requests
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
├── providers/             # React context providers
└── config/                # App configuration
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: React Query (@tanstack/react-query)
- **HTTP Client**: Axios
- **Theme**: next-themes (dark mode support)
- **Code Quality**: ESLint + Prettier

## 📝 Available Scripts

- `npm run dev` - Start development server on port 4000
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🏗️ How to Add New Features

### Example: Adding a "Products" Feature

1. **Create types** in `src/types/product.types.ts`
2. **Add API routes** in `src/services/api/axiosRoutes.ts`
3. **Add API types** in `src/services/api/axiosRoutes.type.ts`
4. **Add request handlers** to `src/services/requests/req.ts` (export productsRequests)
5. **Add response handlers** to `src/services/requests/res.ts` (export productsResponses)
6. **Create custom hook** in `src/customhooks/useProductsLogic.ts`
7. **Create page** in `src/app/products/page.tsx`

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed examples.

## 🌐 Internationalization (i18n)

The project supports multiple languages through Next.js locale routing:

```
src/app/(locale)/
├── en/    # English pages
└── ar/    # Arabic pages
```

Use the `useChangeLanguage` hook to switch languages.

## 🎨 Styling Guidelines

- Use **Tailwind CSS** utility classes
- Follow **mobile-first** responsive design
- Use **shadcn/ui** components from `src/components/ui/`
- Support **dark mode** via next-themes

## 📦 Key Features

- ✅ **Type-safe API calls** with TypeScript
- ✅ **React Query** for server state management
- ✅ **Automatic error handling** with interceptors
- ✅ **Dark mode support** with next-themes
- ✅ **i18n ready** with locale routing
- ✅ **Reusable custom hooks** for data fetching
- ✅ **Clean separation** of concerns

## 🔑 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

## 📚 Examples

### Using the Users Feature

```typescript
'use client';
import { useUsersLogic } from '@/customhooks/useUsersLogic';

export default function UsersPage() {
  const { users, isLoading, createUser } = useUsersLogic(1, 10);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### Request/Response Structure

All API requests are in `src/services/requests/req.ts`:
```typescript
export const usersRequests = { getAll, create, update, delete, ... }
export const productsRequests = { getAll, create, update, delete, ... }
// Add more feature requests here
```

All API responses are in `src/services/requests/res.ts`:
```typescript
export const usersResponses = { processUser, processGetAll, ... }
export const productsResponses = { processProduct, processList, ... }
// Add more feature responses here
```

See `src/app/users/page.tsx` for a complete example.

## 🤝 Contributing

1. Follow the established folder structure
2. Use TypeScript for all new code
3. Run linting before committing: `npm run lint:fix`
4. Format code: `npm run format`

## 📄 License

This project is private and confidential.

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
