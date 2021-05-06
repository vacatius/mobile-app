import * as Types from '../../../types.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type UpdateUserMutationMutationVariables = Types.Exact<{
  input: Types.UpdateUserInput;
}>;


export type UpdateUserMutationMutation = { updateUser: { id: string, displayName: string, username: string, email: string } };


export const UpdateUserMutationDocument = gql`
    mutation updateUserMutation($input: UpdateUserInput!) {
  updateUser(data: $input) {
    id
    displayName
    username
    email
  }
}
    `;
export type UpdateUserMutationMutationFn = Apollo.MutationFunction<UpdateUserMutationMutation, UpdateUserMutationMutationVariables>;

/**
 * __useUpdateUserMutationMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutationMutation, { data, loading, error }] = useUpdateUserMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutationMutation, UpdateUserMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutationMutation, UpdateUserMutationMutationVariables>(UpdateUserMutationDocument, options);
      }
export type UpdateUserMutationMutationHookResult = ReturnType<typeof useUpdateUserMutationMutation>;
export type UpdateUserMutationMutationResult = Apollo.MutationResult<UpdateUserMutationMutation>;
export type UpdateUserMutationMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutationMutation, UpdateUserMutationMutationVariables>;
export const namedOperations = {
  Mutation: {
    updateUserMutation: 'updateUserMutation'
  }
}