import * as Types from '../../../types.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TripsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TripsQuery = { trips: Array<{ id: string, createdAt: any, name: string, description?: Types.Maybe<string>, startDate?: Types.Maybe<any>, endDate?: Types.Maybe<any>, members: Array<{ id: string, role: Types.TripUserRole, color: string, user: { id: string, displayName: string, username: string, email: string } }> }> };


export const TripsDocument = gql`
    query trips {
  trips {
    id
    createdAt
    name
    description
    startDate
    endDate
    members {
      id
      role
      color
      user {
        id
        displayName
        username
        email
      }
    }
  }
}
    `;

/**
 * __useTripsQuery__
 *
 * To run a query within a React component, call `useTripsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTripsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTripsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTripsQuery(baseOptions?: Apollo.QueryHookOptions<TripsQuery, TripsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TripsQuery, TripsQueryVariables>(TripsDocument, options);
      }
export function useTripsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TripsQuery, TripsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TripsQuery, TripsQueryVariables>(TripsDocument, options);
        }
export type TripsQueryHookResult = ReturnType<typeof useTripsQuery>;
export type TripsLazyQueryHookResult = ReturnType<typeof useTripsLazyQuery>;
export type TripsQueryResult = Apollo.QueryResult<TripsQuery, TripsQueryVariables>;
export function refetchTripsQuery(variables?: TripsQueryVariables) {
      return { query: TripsDocument, variables: variables }
    }
export const namedOperations = {
  Query: {
    trips: 'trips'
  }
}