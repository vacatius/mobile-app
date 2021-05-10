import * as Types from '../../../types.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type RemoveMemberFromTripMutationVariables = Types.Exact<{
  tripId: Types.Scalars['String'];
  userId: Types.Scalars['String'];
}>;


export type RemoveMemberFromTripMutation = { removeMemberFromTrip: { id: string } };


export const RemoveMemberFromTripDocument = gql`
    mutation removeMemberFromTrip($tripId: String!, $userId: String!) {
  removeMemberFromTrip(tripId: $tripId, userIdToRemove: $userId) {
    id
  }
}
    `;
export type RemoveMemberFromTripMutationFn = Apollo.MutationFunction<RemoveMemberFromTripMutation, RemoveMemberFromTripMutationVariables>;

/**
 * __useRemoveMemberFromTripMutation__
 *
 * To run a mutation, you first call `useRemoveMemberFromTripMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMemberFromTripMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMemberFromTripMutation, { data, loading, error }] = useRemoveMemberFromTripMutation({
 *   variables: {
 *      tripId: // value for 'tripId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRemoveMemberFromTripMutation(baseOptions?: Apollo.MutationHookOptions<RemoveMemberFromTripMutation, RemoveMemberFromTripMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveMemberFromTripMutation, RemoveMemberFromTripMutationVariables>(RemoveMemberFromTripDocument, options);
      }
export type RemoveMemberFromTripMutationHookResult = ReturnType<typeof useRemoveMemberFromTripMutation>;
export type RemoveMemberFromTripMutationResult = Apollo.MutationResult<RemoveMemberFromTripMutation>;
export type RemoveMemberFromTripMutationOptions = Apollo.BaseMutationOptions<RemoveMemberFromTripMutation, RemoveMemberFromTripMutationVariables>;
export const namedOperations = {
  Mutation: {
    removeMemberFromTrip: 'removeMemberFromTrip'
  }
}