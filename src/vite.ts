import { parse } from "graphql";

// Vite plugin interface
interface VitePlugin {
  name: string;
  load?(id: string): string | null;
  transform?(code: string, id: string): { code: string; map: null } | null;
  resolveId?(id: string, importer?: string): string | null;
}

/**
 * Vite plugin for GraphQL files and template literals
 * Поддерживает импорт .gql/.graphql файлов и обработку gql`` template literals
 */
export function graphqlPlugin(
  options: {
    /**
     * Включить валидацию GraphQL схемы
     */
    validate?: boolean;
    /**
     * Удалять комментарии из GraphQL
     */
    stripComments?: boolean;
  } = {}
): VitePlugin {
  const { validate = true, stripComments = true } = options;
  return {
    name: "graphql",

    // Разрешаем импорт .gql и .graphql файлов
    resolveId(id: string) {
      if (id.endsWith(".gql") || id.endsWith(".graphql")) {
        return id;
      }
      return null;
    },

    // Загружаем .gql/.graphql файлы как обычный текст
    load(id: string) {
      // Для .gql файлов возвращаем null, чтобы Vite загрузил их как обычный текст
      // и затем мы обработаем в transform()
      return null;
    },

    // Трансформируем содержимое .gql/.graphql файлов после загрузки
    transform(code: string, id: string) {
      // Обрабатываем GraphQL файлы
      if (id.endsWith(".gql") || id.endsWith(".graphql")) {
        try {
          let source = code.trim().replace(/\r\n/g, "\n");

          // Удаляем комментарии если нужно
          if (stripComments) {
            source = source.replace(/#[^\n\r]*/g, "");
          }

          // Валидируем GraphQL если включено
          if (validate) {
            parse(source);
          }

          // Генерируем JavaScript модуль (Vite не поддерживает TypeScript типы в runtime)
          return {
            code: `
import { parse } from "graphql";

const documentNode = parse(${JSON.stringify(source)});

export default documentNode;
export { documentNode };
`.trim(),
            map: null,
          };
        } catch (error) {
          throw new Error(
            `GraphQL parsing error in ${id}: ${
              error instanceof Error ? error.message : "Unknown error"
            }`
          );
        }
      }

      // Обрабатываем gql template literals в TS/JS файлах
      if (!/\.(tsx?|jsx?)$/.test(id)) {
        return null;
      }

      // Ищем gql template literals
      const gqlRegex = /gql`([^`]+)`/g;
      let hasGraphQL = false;

      const transformedCode = code.replace(
        gqlRegex,
        (match: string, query: string) => {
          hasGraphQL = true;
          // Очищаем запрос от лишних пробелов
          const cleanQuery = query
            .replace(/\s+/g, " ")
            .replace(/\n/g, " ")
            .trim();

          return `gql\`${cleanQuery}\``;
        }
      );

      if (hasGraphQL) {
        return {
          code: transformedCode,
          map: null,
        };
      }

      return null;
    },
  };
}

export default graphqlPlugin;
