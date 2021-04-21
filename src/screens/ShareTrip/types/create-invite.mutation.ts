import * as Types from '../../../types.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CreateInvitationMutationVariables = Types.Exact<{
  input: Types.CreateInvitationInput;
}>;


export type CreateInvitationMutation = { createInvitation: { id: string, status: Types.InvitationStatus, acceptedUsersCount: number, tripId: string, createdByUser: { displayName: string } } };


export const CreateInvitationDocument = gql`
    mutation createInvitation($input: CreateInvitationInput!) {
  createInvitation(data: $input) {
    id
    status
    createdByUser {
      displayName
    }
    acceptedUsersCount
    tripId
  }
}
    `;
export type CreateInvitationMutationFn = Apollo.MutationFunction<CreateInvitationMutation, CreateInvitationMutationVariables>;

/**
 * __useCreateInvitationMutation__
 *
 * To run a mutation, you first call `useCreateInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInvitationMutation, { data, loading, error }] = useCreateInvitationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateInvitationMutation(baseOptions?: Apollo.MutationHookOptions<CreateInvitationMutation, CreateInvitationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInvitationMutation, CreateInvitationMutationVariables>(CreateInvitationDocument, options);
      }
export type CreateInvitationMutationHookResult = ReturnType<typeof useCreateInvitationMutation>;
export type CreateInvitationMutationResult = Apollo.MutationResult<CreateInvitationMutation>;
export type CreateInvitationMutationOptions = Apollo.BaseMutationOptions<CreateInvitationMutation, CreateInvitationMutationVariables>;
export const namedOperations = {
  Mutation: {
    createInvitation: 'createInvitation'
  }
}