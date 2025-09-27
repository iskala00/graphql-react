# 🚀 GraphQL Лоадер для React

[![npm version](https://badge.fury.io/js/@iskala00%2Fgraphql-react.svg)](https://badge.fury.io/js/@iskala00%2Fgraphql-react)
[![Downloads](https://img.shields.io/npm/dm/@iskala00/graphql-react.svg)](https://www.npmjs.com/package/@iskala00/graphql-react)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/iskala00/graphql-react.svg?style=social&label=Star)](https://github.com/iskala00/graphql-react)

> [🇺🇸 English version](./README.en.md) | [📦 npm package](https://www.npmjs.com/package/@iskala00/graphql-react)

**Современный ESM GraphQL лоадер и тег для шаблонных литералов** с поддержкой Vite, Next.js и Turbopack.

> ⭐ **Поставьте звезду, если этот пакет вам помог!** ⭐

## 📦 Установка

```bash
bun add @iskala00/graphql-react graphql
```

## 🚀 Поддерживаемые платформы

### 1. Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import { graphqlPlugin } from '@iskala00/graphql-react'

export default defineConfig({
  plugins: [
    graphqlPlugin({
      validate: true,        // валидация GraphQL (по умолчанию)
      stripComments: true    // удаление комментариев (по умолчанию)
    })
  ]
})
```

### 2. Next.js с Turbopack

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.{gql,graphql}': {
        loaders: ['@iskala00/graphql-react/loader'],
        as: '*.ts'
      }
    }
  }
}

export default nextConfig
```

### 3. Next.js с Webpack

```javascript
// next.config.js
const { withGraphQL } = require('@iskala00/graphql-react')

module.exports = withGraphQL({
  // Ваша конфигурация Next.js
})
```

## 🚀 Базовое использование

### Шаблонные литералы

```typescript
import { gql } from '@iskala00/graphql-react'

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`

// Используйте с вашим GraphQL клиентом
const result = await client.query({ query: GET_USER, variables: { id: '1' } })
```

### GraphQL файлы

Создайте `.gql` или `.graphql` файл:

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

Импортируйте его напрямую:

```typescript
import GetUser from './queries/GetUser.gql'

// Используйте с вашим GraphQL клиентом
const result = await client.query({ query: GetUser, variables: { id: '1' } })
```

## ✨ Основные возможности

- ✅ **ESM модули** - Современная архитектура с tree-shaking
- ✅ **TypeScript из коробки** - Полная типизация генерируемого кода  
- ✅ **Импорт .gql файлов** - Прямой импорт GraphQL файлов
- ✅ **Template literals** - Поддержка gql\`...\` синтаксиса
- ✅ **3 платформы** - Vite, Next.js Turbopack, Next.js Webpack

## 🔤 TypeScript поддержка

Добавьте типы в ваш проект:

```typescript
// types.d.ts
/// <reference types="@iskala00/graphql-react/graphql" />
```

## 🤝 Совместимость с GraphQL клиентами

Работает со всеми популярными GraphQL клиентами:

### Apollo Client
```typescript
import { useQuery } from '@apollo/client'
import { gql } from '@iskala00/graphql-react'

const GET_USER = gql`query GetUser { user { id name } }`
const { data } = useQuery(GET_USER)
```

### urql
```typescript
import { useQuery } from 'urql'
import GetUser from './GetUser.gql'

const [result] = useQuery({ query: GetUser })
```

### graphql-request  
```typescript
import { request } from 'graphql-request'
import { gql } from '@iskala00/graphql-react'

const query = gql`query GetUser { user { name } }`
await request('https://api.example.com', query)
```

## 📄 Лицензия

MIT

---

Сделано с ❤️ для современной разработки на React