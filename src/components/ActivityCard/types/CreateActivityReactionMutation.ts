import * as Types from '../../../types.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CreateActivityReactionMutationVariables = Types.Exact<{
  input: Types.CreateActivityReactionInput;
}>;


export type CreateActivityReactionMutation = { createActivityReaction: { id: string } };


export const CreateActivityReactionDocument = gql`
    mutation createActivityReaction($input: CreateActivityReactionInput!) {
  createActivityReaction(data: $input) {
    id
  }
}
    `;
export type CreateActivityReactionMutationFn = Apollo.MutationFunction<CreateActivityReactionMutation, CreateActivityReactionMutationVariables>;

/**
 * __useCreateActivityReactionMutation__
 *
 * To run a mutation, you first call `useCreateActivityReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateActivityReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createActivityReactionMutation, { data, loading, error }] = useCreateActivityReactionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateActivityReactionMutation(baseOptions?: Apollo.MutationHookOptions<CreateActivityReactionMutation, CreateActivityReactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateActivityReactionMutation, CreateActivityReactionMutationVariables>(CreateActivityReactionDocument, options);
      }
export type CreateActivityReactionMutationHookResult = ReturnType<typeof useCreateActivityReactionMutation>;
export type CreateActivityReactionMutationResult = Apollo.MutationResult<CreateActivityReactionMutation>;
export type CreateActivityReactionMutationOptions = Apollo.BaseMutationOptions<CreateActivityReactionMutation, CreateActivityReactionMutationVariables>;
export const namedOperations = {
  Mutation: {
    createActivityReaction: 'createActivityReaction'
  }
}