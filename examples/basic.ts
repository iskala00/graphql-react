import { gql } from "../src/index.js";

// Базовое использование
const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;

// С интерполяцией
const userFields = "id name email avatar";
const GET_USER_WITH_FIELDS = gql`
  query GetUserWithFields($id: ID!) {
    user(id: $id) {
      ${userFields}
    }
  }
`;

// Мутация
const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`;

// Фрагмент
const USER_FRAGMENT = gql`
  fragment UserInfo on User {
    id
    name
    email
    avatar
  }
`;

console.log("GET_USER query:", GET_USER.toString?.());
console.log("Has __raw property:", "__raw" in GET_USER);
console.log("Kind:", GET_USER.kind);
