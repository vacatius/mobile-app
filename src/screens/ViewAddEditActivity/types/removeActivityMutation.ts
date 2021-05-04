import * as Types from '../../../types.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type RemoveActivityMutationVariables = Types.Exact<{
  input: Types.Scalars['String'];
}>;


export type RemoveActivityMutation = { removeActivity: { successful: boolean } };


export const RemoveActivityDocument = gql`
    mutation removeActivity($input: String!) {
  removeActivity(id: $input) {
    successful
  }
}
    `;
export type RemoveActivityMutationFn = Apollo.MutationFunction<RemoveActivityMutation, RemoveActivityMutationVariables>;

/**
 * __useRemoveActivityMutation__
 *
 * To run a mutation, you first call `useRemoveActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeActivityMutation, { data, loading, error }] = useRemoveActivityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveActivityMutation(baseOptions?: Apollo.MutationHookOptions<RemoveActivityMutation, RemoveActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveActivityMutation, RemoveActivityMutationVariables>(RemoveActivityDocument, options);
      }
export type RemoveActivityMutationHookResult = ReturnType<typeof useRemoveActivityMutation>;
export type RemoveActivityMutationResult = Apollo.MutationResult<RemoveActivityMutation>;
export type RemoveActivityMutationOptions = Apollo.BaseMutationOptions<RemoveActivityMutation, RemoveActivityMutationVariables>;
export const namedOperations = {
  Mutation: {
    removeActivity: 'removeActivity'
  }
}