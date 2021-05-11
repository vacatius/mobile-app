import * as Types from '../../../types.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetInvitationQueryVariables = Types.Exact<{
  invitationId: Types.Scalars['String'];
}>;


export type GetInvitationQuery = { invitation: { id: string, status: Types.InvitationStatus, acceptedUsersCount: number, createdByUser: { displayName: string, username: string, id: string }, trip: { id: string, name: string, description?: Types.Maybe<string> } } };


export const GetInvitationDocument = gql`
    query getInvitation($invitationId: String!) {
  invitation(invitationId: $invitationId) {
    id
    status
    createdByUser {
      displayName
      username
      id
    }
    trip {
      id
      name
      description
    }
    acceptedUsersCount
  }
}
    `;

/**
 * __useGetInvitationQuery__
 *
 * To run a query within a React component, call `useGetInvitationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvitationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvitationQuery({
 *   variables: {
 *      invitationId: // value for 'invitationId'
 *   },
 * });
 */
export function useGetInvitationQuery(baseOptions: Apollo.QueryHookOptions<GetInvitationQuery, GetInvitationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInvitationQuery, GetInvitationQueryVariables>(GetInvitationDocument, options);
      }
export function useGetInvitationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInvitationQuery, GetInvitationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInvitationQuery, GetInvitationQueryVariables>(GetInvitationDocument, options);
        }
export type GetInvitationQueryHookResult = ReturnType<typeof useGetInvitationQuery>;
export type GetInvitationLazyQueryHookResult = ReturnType<typeof useGetInvitationLazyQuery>;
export type GetInvitationQueryResult = Apollo.QueryResult<GetInvitationQuery, GetInvitationQueryVariables>;
export function refetchGetInvitationQuery(variables?: GetInvitationQueryVariables) {
      return { query: GetInvitationDocument, variables: variables }
    }
export const namedOperations = {
  Query: {
    getInvitation: 'getInvitation'
  }
}