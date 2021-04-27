import * as Types from '../../../types.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type RemoveActivityGroupMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type RemoveActivityGroupMutation = { removeTripRoutePoint: { name?: Types.Maybe<string> } };


export const RemoveActivityGroupDocument = gql`
    mutation removeActivityGroup($id: String!) {
  removeTripRoutePoint(id: $id) {
    name
  }
}
    `;
export type RemoveActivityGroupMutationFn = Apollo.MutationFunction<RemoveActivityGroupMutation, RemoveActivityGroupMutationVariables>;

/**
 * __useRemoveActivityGroupMutation__
 *
 * To run a mutation, you first call `useRemoveActivityGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveActivityGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeActivityGroupMutation, { data, loading, error }] = useRemoveActivityGroupMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveActivityGroupMutation(baseOptions?: Apollo.MutationHookOptions<RemoveActivityGroupMutation, RemoveActivityGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveActivityGroupMutation, RemoveActivityGroupMutationVariables>(RemoveActivityGroupDocument, options);
      }
export type RemoveActivityGroupMutationHookResult = ReturnType<typeof useRemoveActivityGroupMutation>;
export type RemoveActivityGroupMutationResult = Apollo.MutationResult<RemoveActivityGroupMutation>;
export type RemoveActivityGroupMutationOptions = Apollo.BaseMutationOptions<RemoveActivityGroupMutation, RemoveActivityGroupMutationVariables>;
export const namedOperations = {
  Mutation: {
    removeActivityGroup: 'removeActivityGroup'
  }
}