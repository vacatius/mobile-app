import * as Types from '../../../types.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type RemoveActivityReactionMutationVariables = Types.Exact<{
  input: Types.Scalars['String'];
}>;


export type RemoveActivityReactionMutation = { removeActivityReaction: { id: string } };


export const RemoveActivityReactionDocument = gql`
    mutation removeActivityReaction($input: String!) {
  removeActivityReaction(activityReactionId: $input) {
    id
  }
}
    `;
export type RemoveActivityReactionMutationFn = Apollo.MutationFunction<RemoveActivityReactionMutation, RemoveActivityReactionMutationVariables>;

/**
 * __useRemoveActivityReactionMutation__
 *
 * To run a mutation, you first call `useRemoveActivityReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveActivityReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeActivityReactionMutation, { data, loading, error }] = useRemoveActivityReactionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveActivityReactionMutation(baseOptions?: Apollo.MutationHookOptions<RemoveActivityReactionMutation, RemoveActivityReactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveActivityReactionMutation, RemoveActivityReactionMutationVariables>(RemoveActivityReactionDocument, options);
      }
export type RemoveActivityReactionMutationHookResult = ReturnType<typeof useRemoveActivityReactionMutation>;
export type RemoveActivityReactionMutationResult = Apollo.MutationResult<RemoveActivityReactionMutation>;
export type RemoveActivityReactionMutationOptions = Apollo.BaseMutationOptions<RemoveActivityReactionMutation, RemoveActivityReactionMutationVariables>;
export const namedOperations = {
  Mutation: {
    removeActivityReaction: 'removeActivityReaction'
  }
}