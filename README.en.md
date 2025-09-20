# GraphQL Loader for React

> [🇷🇺 Русская версия](./README.md)

Modern ESM GraphQL loader and template literal tag with support for Vite, Next.js (webpack), and Turbopack.

## ✨ Features

- ✅ **ESM Only** - Modern ES modules with tree-shaking support
- ✅ **TypeScript** - Full TypeScript support with proper types
- ✅ **File Loader** - Load `.gql` and `.graphql` files directly
- ✅ **Template Literals** - Clean syntax with template literal support
- ✅ **Vite Support** - Built-in Vite plugin for GraphQL optimization
- ✅ **Next.js Support** - Webpack loader for Next.js projects
- ✅ **Turbopack Ready** - Compatible with Next.js Turbopack
- ✅ **Zero Dependencies** - Only peer dependency on GraphQL

## 📦 Installation

```bash
bun add @iskala/graphql-react graphql
```

## 🚀 Basic Usage

### Template Literals

```typescript
import { gql } from '@iskala/graphql-react'

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`

// Use with your GraphQL client
const result = await client.query({ query: GET_USER, variables: { id: '1' } })
```

### GraphQL Files

Create a `.gql` or `.graphql` file:

```graphql
# queries/GetUser.gql
query GetUser($id: ID!) {
  user(id: $id) {
    id
    name
    email
  }
}
```

Import it directly:

```typescript
import GetUser from './queries/GetUser.gql'

// Use with your GraphQL client
const result = await client.query({ query: GetUser, variables: { id: '1' } })
```

## ⚙️ Framework Integration

### Turbopack (Next.js 15+)

Configure Turbopack in your `next.config.ts`:

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    rules: {
      '*.{gql,graphql}': {
        loaders: ['@iskala/graphql-react/loader'],
        as: '*.ts',
      },
    },
  },
}

export default nextConfig
```

### Vite

Add the GraphQL plugin to your `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import { graphqlPlugin } from '@iskala/graphql-react'

export default defineConfig({
  plugins: [
    graphqlPlugin(),
    // ... other plugins
  ],
})
```

### Next.js (Webpack)

Update your `next.config.js`:

```javascript
const { withGraphQL } = require('@iskala/graphql-react')

module.exports = withGraphQL({
  // Your Next.js config
})
```

This automatically configures webpack to handle both template literals and `.gql`/`.graphql` files.

## 🔧 Advanced Usage

### TypeScript Support for GraphQL Files

Add the type declarations to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["@iskala/graphql-react/graphql"]
  }
}
```

Or create a `types.d.ts` file in your project:

```typescript
/// <reference types="@iskala/graphql-react/graphql" />
```

### Custom Configuration

```typescript
import { createGraphQLTag } from '@iskala/graphql-react'

const gql = createGraphQLTag({
  stripComments: true,
  transform: (query) => query.replace(/\s+/g, ' ').trim(),
})

const query = gql`
  # This comment will be stripped
  query GetUser {
    user {
      id
      name
    }
  }
`
```

### Template Interpolation

```typescript
import { gql } from '@iskala/graphql-react'

const userFields = 'id name email'

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      ${userFields}
    }
  }
`
```

## 📚 API Reference

### `gql`

The main GraphQL template literal tag function.

```typescript
function gql(
  strings: TemplateStringsArray,
  ...values: readonly any[]
): GraphQLDocumentNode
```

### `createGraphQLTag`

Creates a configured GraphQL tag with custom options.

```typescript
function createGraphQLTag(options?: GraphQLTagOptions): GraphQLTag

interface GraphQLTagOptions {
  includeLocation?: boolean
  stripComments?: boolean
  transform?: (query: string) => string
}
```

### `graphqlPlugin`

Vite plugin for GraphQL template literals.

```typescript
function graphqlPlugin(): Plugin
```

### `withGraphQL`

Next.js configuration helper.

```typescript
function withGraphQL(nextConfig?: any): any
```

## 🔤 TypeScript Support

The package includes full TypeScript definitions:

```typescript
import type { 
  DocumentNode, 
  GraphQLDocumentNode, 
  GraphQLTag,
  GraphQLTagOptions 
} from '@iskala/graphql-react'
```

## 💡 Best Practices

1. **Use with GraphQL Clients**: Works seamlessly with Apollo Client, urql, graphql-request, and other GraphQL clients.

2. **Code Splitting**: The ESM build supports tree-shaking and code splitting.

3. **Development**: Use the bundler plugins for better development experience and build optimization.

4. **TypeScript**: Enable strict mode for better type safety.

## 🔄 Automatic Releases

This package uses [semantic-release](https://semantic-release.gitbook.io/) for automatic releases. Use [Conventional Commits](https://www.conventionalcommits.org/) for automatic versioning:

- `feat:` - new features (minor version)
- `fix:` - bug fixes (patch version)
- `BREAKING CHANGE:` - breaking changes (major version)

Example commits:
```bash
git commit -m "feat: add GraphQL fragment support"
git commit -m "fix: resolve comment parsing in queries"
git commit -m "feat!: change loader API

BREAKING CHANGE: changed return object format"
```

## 🛠 Development

```bash
# Install dependencies
bun install

# Build the package
bun run build

# Run tests
bun test

# Watch mode for development
bun run dev
```

## 🤝 GraphQL Client Compatibility

### Apollo Client

```typescript
import { useQuery } from '@apollo/client'
import { gql } from '@iskala/graphql-react'

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
    }
  }
`

function Users() {
  const { loading, error, data } = useQuery(GET_USERS)
  // ...
}
```

### urql

```typescript
import { useQuery } from 'urql'
import GetUsers from './queries/GetUsers.gql'

function Users() {
  const [result] = useQuery({ query: GetUsers })
  // ...
}
```

### graphql-request

```typescript
import { request } from 'graphql-request'
import { gql } from '@iskala/graphql-react'

const query = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      name
    }
  }
`

const data = await request('https://api.example.com/graphql', query, { id: '1' })
```

## 📄 License

MIT

---

Made with ❤️ for modern React development
