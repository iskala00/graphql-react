# GraphQL Лоадер для React

> [🇺🇸 English version](./README.en.md)

Современный ESM GraphQL лоадер и тег для шаблонных литералов с поддержкой Vite, Next.js (webpack) и Turbopack.

## ✨ Возможности

- ✅ **Только ESM** - Современные ES модули с поддержкой tree-shaking
- ✅ **TypeScript** - Полная поддержка TypeScript с правильными типами
- ✅ **Загрузка файлов** - Загружайте `.gql` и `.graphql` файлы напрямую
- ✅ **Шаблонные литералы** - Чистый синтаксис с поддержкой template literals
- ✅ **Поддержка Vite** - Встроенный плагин для оптимизации GraphQL в Vite
- ✅ **Поддержка Next.js** - Webpack лоадер для проектов Next.js
- ✅ **Готов для Turbopack** - Совместим с Next.js Turbopack
- ✅ **Без зависимостей** - Только peer dependency на GraphQL

## 📦 Установка

```bash
bun add @iskala00/graphql-react graphql
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

## ⚙️ Интеграция с фреймворками

### Turbopack (Next.js 15+)

Настройте Turbopack в вашем `next.config.ts`:

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

Добавьте GraphQL плагин в ваш `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import { graphqlPlugin } from '@iskala/graphql-react'

export default defineConfig({
  plugins: [
    graphqlPlugin(),
    // ... другие плагины
  ],
})
```

### Next.js (Webpack)

Обновите ваш `next.config.js`:

```javascript
const { withGraphQL } = require('@iskala/graphql-react')

module.exports = withGraphQL({
  // Ваша конфигурация Next.js
})
```

Это автоматически настроит webpack для обработки шаблонных литералов и `.gql`/`.graphql` файлов.

## 🔧 Расширенное использование

### Поддержка TypeScript для GraphQL файлов

Добавьте объявления типов в ваш `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["@iskala/graphql-react/graphql"]
  }
}
```

Или создайте файл `types.d.ts` в вашем проекте:

```typescript
/// <reference types="@iskala/graphql-react/graphql" />
```

### Кастомная конфигурация

```typescript
import { createGraphQLTag } from '@iskala/graphql-react'

const gql = createGraphQLTag({
  stripComments: true,
  transform: (query) => query.replace(/\s+/g, ' ').trim(),
})

const query = gql`
  # Этот комментарий будет удален
  query GetUser {
    user {
      id
      name
    }
  }
`
```

### Интерполяция в шаблонах

```typescript
import { gql } from '@iskala00/graphql-react'

const userFields = 'id name email'

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      ${userFields}
    }
  }
`
```

## 📚 API Справочник

### `gql`

Основная функция GraphQL тега для шаблонных литералов.

```typescript
function gql(
  strings: TemplateStringsArray,
  ...values: readonly any[]
): GraphQLDocumentNode
```

### `createGraphQLTag`

Создает настроенный GraphQL тег с кастомными опциями.

```typescript
function createGraphQLTag(options?: GraphQLTagOptions): GraphQLTag

interface GraphQLTagOptions {
  includeLocation?: boolean
  stripComments?: boolean
  transform?: (query: string) => string
}
```

### `graphqlPlugin`

Vite плагин для GraphQL шаблонных литералов.

```typescript
function graphqlPlugin(): Plugin
```

### `withGraphQL`

Помощник конфигурации для Next.js.

```typescript
function withGraphQL(nextConfig?: any): any
```

## 🔤 Поддержка TypeScript

Пакет включает полные TypeScript определения:

```typescript
import type { 
  DocumentNode, 
  GraphQLDocumentNode, 
  GraphQLTag,
  GraphQLTagOptions 
} from '@iskala/graphql-react'
```

## 💡 Лучшие практики

1. **Используйте с GraphQL клиентами**: Работает безупречно с Apollo Client, urql, graphql-request и другими GraphQL клиентами.

2. **Разделение кода**: ESM сборка поддерживает tree-shaking и разделение кода.

3. **Разработка**: Используйте плагины для бандлеров для лучшего опыта разработки и оптимизации сборки.

4. **TypeScript**: Включите строгий режим для лучшей типобезопасности.

## 🔄 Автоматические релизы

Этот пакет использует [semantic-release](https://semantic-release.gitbook.io/) для автоматических релизов. Используйте [Conventional Commits](https://www.conventionalcommits.org/ru/v1.0.0/) для автоматического версионирования:

- `feat:` - новая функциональность (минорная версия)
- `fix:` - исправление багов (патч версия)
- `BREAKING CHANGE:` - breaking changes (мажорная версия)

Примеры коммитов:
```bash
git commit -m "feat: добавить поддержку фрагментов GraphQL"
git commit -m "fix: исправить парсинг комментариев в запросах"
git commit -m "feat!: изменить API лоадера

BREAKING CHANGE: изменен формат возвращаемого объекта"
```

## 🛠 Разработка

```bash
# Установить зависимости
bun install

# Собрать пакет
bun run build

# Запустить тесты
bun test

# Режим разработки с отслеживанием изменений
bun run dev
```

## 🤝 Совместимость с GraphQL клиентами

### Apollo Client

```typescript
import { useQuery } from '@apollo/client'
import { gql } from '@iskala00/graphql-react'

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
import { gql } from '@iskala00/graphql-react'

const query = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      name
    }
  }
`

const data = await request('https://api.example.com/graphql', query, { id: '1' })
```

## 📄 Лицензия

MIT

---

Сделано с ❤️ для современной разработки на React