import { gql } from "@apollo/client";
export const REFRESH_TOKEN_MUTATION = gql`
  mutation refreshToken {
    refreshToken {
      token
    }
  }`