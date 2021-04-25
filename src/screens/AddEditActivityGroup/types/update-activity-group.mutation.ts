import * as Types from '../../../types.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type UpdateActivityGroupMutationVariables = Types.Exact<{
  input: Types.UpdateTripRoutePointInput;
}>;


export type UpdateActivityGroupMutation = { updateTripRoutePoint: { id: string, name?: Types.Maybe<string>, description?: Types.Maybe<string> } };


export const UpdateActivityGroupDocument = gql`
    mutation updateActivityGroup($input: UpdateTripRoutePointInput!) {
  updateTripRoutePoint(data: $input) {
    id
    name
    description
  }
}
    `;
export type UpdateActivityGroupMutationFn = Apollo.MutationFunction<UpdateActivityGroupMutation, UpdateActivityGroupMutationVariables>;

/**
 * __useUpdateActivityGroupMutation__
 *
 * To run a mutation, you first call `useUpdateActivityGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateActivityGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateActivityGroupMutation, { data, loading, error }] = useUpdateActivityGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateActivityGroupMutation(baseOptions?: Apollo.MutationHookOptions<UpdateActivityGroupMutation, UpdateActivityGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateActivityGroupMutation, UpdateActivityGroupMutationVariables>(UpdateActivityGroupDocument, options);
      }
export type UpdateActivityGroupMutationHookResult = ReturnType<typeof useUpdateActivityGroupMutation>;
export type UpdateActivityGroupMutationResult = Apollo.MutationResult<UpdateActivityGroupMutation>;
export type UpdateActivityGroupMutationOptions = Apollo.BaseMutationOptions<UpdateActivityGroupMutation, UpdateActivityGroupMutationVariables>;
export const namedOperations = {
  Mutation: {
    updateActivityGroup: 'updateActivityGroup'
  }
}