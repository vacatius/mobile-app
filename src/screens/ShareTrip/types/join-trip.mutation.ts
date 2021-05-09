import * as Types from '../../../types.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type JoinTripMutationVariables = Types.Exact<{
  input: Types.JoinTripInput;
}>;


export type JoinTripMutation = { joinTrip: { id: string, members: Array<{ user: { displayName: string, id: string } }> } };


export const JoinTripDocument = gql`
    mutation joinTrip($input: JoinTripInput!) {
  joinTrip(data: $input) {
    id
    members {
      user {
        displayName
        id
      }
    }
  }
}
    `;
export type JoinTripMutationFn = Apollo.MutationFunction<JoinTripMutation, JoinTripMutationVariables>;

/**
 * __useJoinTripMutation__
 *
 * To run a mutation, you first call `useJoinTripMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinTripMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinTripMutation, { data, loading, error }] = useJoinTripMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useJoinTripMutation(baseOptions?: Apollo.MutationHookOptions<JoinTripMutation, JoinTripMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinTripMutation, JoinTripMutationVariables>(JoinTripDocument, options);
      }
export type JoinTripMutationHookResult = ReturnType<typeof useJoinTripMutation>;
export type JoinTripMutationResult = Apollo.MutationResult<JoinTripMutation>;
export type JoinTripMutationOptions = Apollo.BaseMutationOptions<JoinTripMutation, JoinTripMutationVariables>;
export const namedOperations = {
  Mutation: {
    joinTrip: 'joinTrip'
  }
}