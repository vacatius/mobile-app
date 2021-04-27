import * as Types from '../../../types.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type AddActivityGroupMutationVariables = Types.Exact<{
  input: Types.CreateTripRoutePointInput;
}>;


export type AddActivityGroupMutation = { createTripRoutePoint: { id: string, name?: Types.Maybe<string>, description?: Types.Maybe<string> } };


export const AddActivityGroupDocument = gql`
    mutation addActivityGroup($input: CreateTripRoutePointInput!) {
  createTripRoutePoint(data: $input) {
    id
    name
    description
  }
}
    `;
export type AddActivityGroupMutationFn = Apollo.MutationFunction<AddActivityGroupMutation, AddActivityGroupMutationVariables>;

/**
 * __useAddActivityGroupMutation__
 *
 * To run a mutation, you first call `useAddActivityGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddActivityGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addActivityGroupMutation, { data, loading, error }] = useAddActivityGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddActivityGroupMutation(baseOptions?: Apollo.MutationHookOptions<AddActivityGroupMutation, AddActivityGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddActivityGroupMutation, AddActivityGroupMutationVariables>(AddActivityGroupDocument, options);
      }
export type AddActivityGroupMutationHookResult = ReturnType<typeof useAddActivityGroupMutation>;
export type AddActivityGroupMutationResult = Apollo.MutationResult<AddActivityGroupMutation>;
export type AddActivityGroupMutationOptions = Apollo.BaseMutationOptions<AddActivityGroupMutation, AddActivityGroupMutationVariables>;
export const namedOperations = {
  Mutation: {
    addActivityGroup: 'addActivityGroup'
  }
}