import * as Types from '../../../types.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type LeaveTripMutationVariables = Types.Exact<{
  tripId: Types.Scalars['String'];
}>;


export type LeaveTripMutation = { leaveTrip: { id: string } };


export const LeaveTripDocument = gql`
    mutation leaveTrip($tripId: String!) {
  leaveTrip(tripId: $tripId) {
    id
  }
}
    `;
export type LeaveTripMutationFn = Apollo.MutationFunction<LeaveTripMutation, LeaveTripMutationVariables>;

/**
 * __useLeaveTripMutation__
 *
 * To run a mutation, you first call `useLeaveTripMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveTripMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveTripMutation, { data, loading, error }] = useLeaveTripMutation({
 *   variables: {
 *      tripId: // value for 'tripId'
 *   },
 * });
 */
export function useLeaveTripMutation(baseOptions?: Apollo.MutationHookOptions<LeaveTripMutation, LeaveTripMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveTripMutation, LeaveTripMutationVariables>(LeaveTripDocument, options);
      }
export type LeaveTripMutationHookResult = ReturnType<typeof useLeaveTripMutation>;
export type LeaveTripMutationResult = Apollo.MutationResult<LeaveTripMutation>;
export type LeaveTripMutationOptions = Apollo.BaseMutationOptions<LeaveTripMutation, LeaveTripMutationVariables>;
export const namedOperations = {
  Mutation: {
    leaveTrip: 'leaveTrip'
  }
}