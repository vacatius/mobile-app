import * as Types from '../../../types.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetActivityQueryVariables = Types.Exact<{
  activityId: Types.Scalars['ID'];
}>;


export type GetActivityQuery = { node?: Types.Maybe<{ __typename: 'Activity', id: string, name: string, description?: Types.Maybe<string>, linkToDetails?: Types.Maybe<string>, startDate?: Types.Maybe<string>, endDate?: Types.Maybe<string>, routePoint: { id: string }, addedByUser: { id: string } } | { __typename: 'ActivityReaction', id: string } | { __typename: 'Invitation', id: string } | { __typename: 'Trip', id: string } | { __typename: 'TripMember', id: string } | { __typename: 'TripRoutePoint', id: string } | { __typename: 'User', id: string }> };


export const GetActivityDocument = gql`
    query getActivity($activityId: ID!) {
  node(id: $activityId) {
    id
    __typename
    ... on Activity {
      id
      name
      description
      linkToDetails
      startDate
      endDate
      routePoint {
        id
      }
      addedByUser {
        id
      }
    }
  }
}
    `;

/**
 * __useGetActivityQuery__
 *
 * To run a query within a React component, call `useGetActivityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActivityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActivityQuery({
 *   variables: {
 *      activityId: // value for 'activityId'
 *   },
 * });
 */
export function useGetActivityQuery(baseOptions: Apollo.QueryHookOptions<GetActivityQuery, GetActivityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetActivityQuery, GetActivityQueryVariables>(GetActivityDocument, options);
      }
export function useGetActivityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetActivityQuery, GetActivityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetActivityQuery, GetActivityQueryVariables>(GetActivityDocument, options);
        }
export type GetActivityQueryHookResult = ReturnType<typeof useGetActivityQuery>;
export type GetActivityLazyQueryHookResult = ReturnType<typeof useGetActivityLazyQuery>;
export type GetActivityQueryResult = Apollo.QueryResult<GetActivityQuery, GetActivityQueryVariables>;
export function refetchGetActivityQuery(variables?: GetActivityQueryVariables) {
      return { query: GetActivityDocument, variables: variables }
    }
export const namedOperations = {
  Query: {
    getActivity: 'getActivity'
  }
}