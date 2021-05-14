import { gql } from "@apollo/client";
export const loginMutation = gql`
  mutation login($input: LoginInput!) {
    login(user: $input) {
        token
    }
}`