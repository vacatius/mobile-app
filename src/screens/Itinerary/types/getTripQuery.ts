import * as Types from '../../../types.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetTripQueryVariables = Types.Exact<{
  tripId: Types.Scalars['ID'];
}>;


export type GetTripQuery = { node?: Types.Maybe<{ __typename: 'Activity', id: string } | { __typename: 'ActivityReaction', id: string } | { __typename: 'Invitation', id: string } | { __typename: 'Trip', createdAt: any, startDate?: Types.Maybe<any>, endDate?: Types.Maybe<any>, name: string, description?: Types.Maybe<string>, id: string, admin: { id: string, displayName: string, username: string }, members: Array<{ role: Types.TripUserRole, color: string, user: { id: string, displayName: string, username: string } }>, itinerary: Array<{ id: string, latitude?: Types.Maybe<number>, longitude?: Types.Maybe<number>, name?: Types.Maybe<string>, description?: Types.Maybe<string>, previousTripRoutePoint?: Types.Maybe<{ name?: Types.Maybe<string> }>, nextTripRoutePoint?: Types.Maybe<{ name?: Types.Maybe<string> }>, activities: Array<{ id: string, name: string, description?: Types.Maybe<string>, startDate?: Types.Maybe<string>, endDate?: Types.Maybe<string>, routePoint: { id: string, name?: Types.Maybe<string> }, addedByUser: { id: string, username: string, displayName: string }, activityReactions: Array<{ id: string, activityReactionType: Types.ActivityReactionType, addedByUser: { id: string } }> }> }> } | { __typename: 'TripMember', id: string } | { __typename: 'TripRoutePoint', id: string } | { __typename: 'User', id: string }> };


export const GetTripDocument = gql`
    query getTrip($tripId: ID!) {
  node(id: $tripId) {
    id
    __typename
    ... on Trip {
      createdAt
      startDate
      endDate
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
      itinerary {
        id
        latitude
        longitude
        name
        description
        previousTripRoutePoint {
          name
        }
        nextTripRoutePoint {
          name
        }
        activities {
          id
          routePoint {
            id
            name
          }
          name
          description
          addedByUser {
            id
            username
            displayName
          }
          startDate
          endDate
          activityReactions {
            id
            activityReactionType
            addedByUser {
              id
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetTripQuery__
 *
 * To run a query within a React component, call `useGetTripQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTripQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTripQuery({
 *   variables: {
 *      tripId: // value for 'tripId'
 *   },
 * });
 */
export function useGetTripQuery(baseOptions: Apollo.QueryHookOptions<GetTripQuery, GetTripQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTripQuery, GetTripQueryVariables>(GetTripDocument, options);
      }
export function useGetTripLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTripQuery, GetTripQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTripQuery, GetTripQueryVariables>(GetTripDocument, options);
        }
export type GetTripQueryHookResult = ReturnType<typeof useGetTripQuery>;
export type GetTripLazyQueryHookResult = ReturnType<typeof useGetTripLazyQuery>;
export type GetTripQueryResult = Apollo.QueryResult<GetTripQuery, GetTripQueryVariables>;
export function refetchGetTripQuery(variables?: GetTripQueryVariables) {
      return { query: GetTripDocument, variables: variables }
    }
export const namedOperations = {
  Query: {
    getTrip: 'getTrip'
  }
}