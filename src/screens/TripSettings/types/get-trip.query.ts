import * as Types from '../../../types.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetUniqueTripQueryVariables = Types.Exact<{
  tripId: Types.Scalars['String'];
}>;


export type GetUniqueTripQuery = { trip: { id: string, name: string, description?: Types.Maybe<string>, admin: { id: string, displayName: string, username: string }, members: Array<{ role: Types.TripUserRole, color: string, user: { id: string, displayName: string, username: string } }> } };


export const GetUniqueTripDocument = gql`
    query getUniqueTrip($tripId: String!) {
  trip(tripId: $tripId) {
    id
    name
    description
    admin {
      id
      displayName
      username
    }
    members {
      role
      color
      user {
        id
        displayName
        username
      }
    }
  }
}
    `;

/**
 * __useGetUniqueTripQuery__
 *
 * To run a query within a React component, call `useGetUniqueTripQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUniqueTripQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUniqueTripQuery({
 *   variables: {
 *      tripId: // value for 'tripId'
 *   },
 * });
 */
export function useGetUniqueTripQuery(baseOptions: Apollo.QueryHookOptions<GetUniqueTripQuery, GetUniqueTripQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUniqueTripQuery, GetUniqueTripQueryVariables>(GetUniqueTripDocument, options);
      }
export function useGetUniqueTripLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUniqueTripQuery, GetUniqueTripQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUniqueTripQuery, GetUniqueTripQueryVariables>(GetUniqueTripDocument, options);
        }
export type GetUniqueTripQueryHookResult = ReturnType<typeof useGetUniqueTripQuery>;
export type GetUniqueTripLazyQueryHookResult = ReturnType<typeof useGetUniqueTripLazyQuery>;
export type GetUniqueTripQueryResult = Apollo.QueryResult<GetUniqueTripQuery, GetUniqueTripQueryVariables>;
export function refetchGetUniqueTripQuery(variables?: GetUniqueTripQueryVariables) {
      return { query: GetUniqueTripDocument, variables: variables }
    }
export const namedOperations = {
  Query: {
    getUniqueTrip: 'getUniqueTrip'
  }
}