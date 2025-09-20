// Example React component using GraphQL files
import React from "react";
// These imports would work after configuring Turbopack/webpack
// import GetUser from './queries/GetUser.gql';
// import CreateUser from './queries/CreateUser.graphql';

// For demo purposes, simulating the imported queries
import { gql } from "../src/index.js";

const GetUser = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      avatar
    }
  }
`;

const CreateUser = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
      success
    }
  }
`;

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface UserComponentProps {
  userId: string;
}

export function UserComponent({ userId }: UserComponentProps) {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(false);

  const fetchUser = async () => {
    setLoading(true);
    try {
      // Example with a GraphQL client (Apollo, urql, etc.)
      // const result = await client.query({
      //   query: GetUser,
      //   variables: { id: userId }
      // });
      // setUser(result.data.user);

      console.log("Would execute query:", GetUser.toString?.());
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (input: Omit<User, "id">) => {
    try {
      // const result = await client.mutate({
      //   mutation: CreateUser,
      //   variables: { input }
      // });

      console.log("Would execute mutation:", CreateUser.toString?.());
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  React.useEffect(() => {
    fetchUser();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Component</h2>
      <p>User ID: {userId}</p>
      <p>Query: {GetUser.__raw}</p>
      <button
        onClick={() => createUser({ name: "John", email: "john@example.com" })}
      >
        Create User
      </button>
    </div>
  );
}
