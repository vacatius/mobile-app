import * as Types from '../../../types.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type UpdateActivityReactionMutationVariables = Types.Exact<{
  input: Types.UpdateActivityReactionInput;
}>;


export type UpdateActivityReactionMutation = { updateActivityReaction: { id: string } };


export const UpdateActivityReactionDocument = gql`
    mutation updateActivityReaction($input: UpdateActivityReactionInput!) {
  updateActivityReaction(data: $input) {
    id
  }
}
    `;
export type UpdateActivityReactionMutationFn = Apollo.MutationFunction<UpdateActivityReactionMutation, UpdateActivityReactionMutationVariables>;

/**
 * __useUpdateActivityReactionMutation__
 *
 * To run a mutation, you first call `useUpdateActivityReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateActivityReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateActivityReactionMutation, { data, loading, error }] = useUpdateActivityReactionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateActivityReactionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateActivityReactionMutation, UpdateActivityReactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateActivityReactionMutation, UpdateActivityReactionMutationVariables>(UpdateActivityReactionDocument, options);
      }
export type UpdateActivityReactionMutationHookResult = ReturnType<typeof useUpdateActivityReactionMutation>;
export type UpdateActivityReactionMutationResult = Apollo.MutationResult<UpdateActivityReactionMutation>;
export type UpdateActivityReactionMutationOptions = Apollo.BaseMutationOptions<UpdateActivityReactionMutation, UpdateActivityReactionMutationVariables>;
export const namedOperations = {
  Mutation: {
    updateActivityReaction: 'updateActivityReaction'
  }
}