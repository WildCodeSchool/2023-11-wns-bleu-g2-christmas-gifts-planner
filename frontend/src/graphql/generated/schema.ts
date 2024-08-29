import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddMembersInputType = {
  members: Array<EmailInputType>;
};

export type Author = {
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
};

export type Channel = {
  __typename?: 'Channel';
  group: Group;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type CompleteProfileInputType = {
  email?: InputMaybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type EmailInputType = {
  email: Scalars['String'];
};

export type Group = {
  __typename?: 'Group';
  channels?: Maybe<Array<Channel>>;
  id: Scalars['Int'];
  members: Array<User>;
  name: Scalars['String'];
  owner: User;
};

export type LoginInputType = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  channelId: Channel;
  content: Scalars['String'];
  id: Scalars['Int'];
  sent_at: Scalars['String'];
  writtenBy: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMemberToGroup: Group;
  changeGroupName: Group;
  completeProfile: Scalars['String'];
  createGroup: Group;
  createMessage: Message;
  createUser: User;
  login: Scalars['String'];
  logout: Scalars['String'];
  updateUser: User;
};


export type MutationAddMemberToGroupArgs = {
  data: AddMembersInputType;
  groupId: Scalars['Int'];
};


export type MutationChangeGroupNameArgs = {
  data: UpdateGroupNameInputType;
  groupId: Scalars['Int'];
};


export type MutationCompleteProfileArgs = {
  data: CompleteProfileInputType;
  token: Scalars['String'];
};


export type MutationCreateGroupArgs = {
  data: NewGroupInputType;
};


export type MutationCreateMessageArgs = {
  data: NewMessageInputType;
};


export type MutationCreateUserArgs = {
  data: NewUserInputType;
};


export type MutationLoginArgs = {
  data: LoginInputType;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInputType;
  userId: Scalars['String'];
};

export type NewGroupInputType = {
  members?: InputMaybe<Array<Scalars['String']>>;
  name: Scalars['String'];
};

export type NewMessageInputType = {
  channelId: ObjectId;
  content: Scalars['String'];
  sent_at: Scalars['String'];
  writtenBy: Author;
};

export type NewUserInputType = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type ObjectId = {
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  channel?: Maybe<Channel>;
  channels: Array<Channel>;
  groupById: Group;
  groups: Array<Group>;
  messages: Array<Message>;
  profile: User;
};


export type QueryChannelArgs = {
  channelId: Scalars['Float'];
  groupId: Scalars['Float'];
};


export type QueryChannelsArgs = {
  groupId: Scalars['Float'];
};


export type QueryGroupByIdArgs = {
  groupId: Scalars['Int'];
};


export type QueryMessagesArgs = {
  channelId?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Float']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Message;
};


export type SubscriptionNewMessageArgs = {
  channelId: Scalars['Int'];
};

export type UpdateGroupNameInputType = {
  name: Scalars['String'];
};

export type UpdateUserInputType = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  groups?: Maybe<Array<Group>>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  memberGroups?: Maybe<Array<Group>>;
  role: Scalars['String'];
};

export type CreateGroupMutationVariables = Exact<{
  data: NewGroupInputType;
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'Group', id: number, name: string, owner: { __typename?: 'User', id: string, lastName?: string | null, firstName?: string | null, email: string }, members: Array<{ __typename?: 'User', email: string, firstName?: string | null, id: string, lastName?: string | null }> } };

export type GroupByIdQueryVariables = Exact<{
  groupId: Scalars['Int'];
}>;


export type GroupByIdQuery = { __typename?: 'Query', groupById: { __typename?: 'Group', id: number, name: string, owner: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string }, members: Array<{ __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string }> } };

export type AddMemberToGroupMutationVariables = Exact<{
  data: AddMembersInputType;
  groupId: Scalars['Int'];
}>;


export type AddMemberToGroupMutation = { __typename?: 'Mutation', addMemberToGroup: { __typename?: 'Group', id: number, name: string, owner: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null }, members: Array<{ __typename?: 'User', email: string, id: string, firstName?: string | null, lastName?: string | null }> } };

export type CreateMessageMutationVariables = Exact<{
  data: NewMessageInputType;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'Message', id: number, content: string, sent_at: string, writtenBy: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null } } };

export type MessagesQueryVariables = Exact<{
  channelId?: InputMaybe<Scalars['Int']>;
}>;


export type MessagesQuery = { __typename?: 'Query', messages: Array<{ __typename?: 'Message', id: number, content: string, sent_at: string, writtenBy: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null }, channelId: { __typename?: 'Channel', id: number } }> };

export type NewMessageSubscriptionVariables = Exact<{
  channelId: Scalars['Int'];
}>;


export type NewMessageSubscription = { __typename?: 'Subscription', newMessage: { __typename?: 'Message', id: number, content: string, sent_at: string, writtenBy: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null }, channelId: { __typename?: 'Channel', id: number } } };

export type CompleteProfileMutationVariables = Exact<{
  data: CompleteProfileInputType;
  token: Scalars['String'];
}>;


export type CompleteProfileMutation = { __typename?: 'Mutation', completeProfile: string };

export type LoginMutationVariables = Exact<{
  data: LoginInputType;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type SignupMutationVariables = Exact<{
  data: NewUserInputType;
}>;


export type SignupMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string } };

export type UpdateUserMutationVariables = Exact<{
  data: UpdateUserInputType;
  userId: Scalars['String'];
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, role: string, groups?: Array<{ __typename?: 'Group', id: number, name: string, members: Array<{ __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string }> }> | null, memberGroups?: Array<{ __typename?: 'Group', name: string, id: number, members: Array<{ __typename?: 'User', firstName?: string | null, email: string, lastName?: string | null }> }> | null } };


export const CreateGroupDocument = gql`
    mutation CreateGroup($data: NewGroupInputType!) {
  createGroup(data: $data) {
    id
    name
    owner {
      id
      lastName
      firstName
      email
    }
    members {
      email
      firstName
      id
      lastName
    }
  }
}
    `;
export type CreateGroupMutationFn = Apollo.MutationFunction<CreateGroupMutation, CreateGroupMutationVariables>;

/**
 * __useCreateGroupMutation__
 *
 * To run a mutation, you first call `useCreateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMutation, { data, loading, error }] = useCreateGroupMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateGroupMutation, CreateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument, options);
      }
export type CreateGroupMutationHookResult = ReturnType<typeof useCreateGroupMutation>;
export type CreateGroupMutationResult = Apollo.MutationResult<CreateGroupMutation>;
export type CreateGroupMutationOptions = Apollo.BaseMutationOptions<CreateGroupMutation, CreateGroupMutationVariables>;
export const GroupByIdDocument = gql`
    query GroupById($groupId: Int!) {
  groupById(groupId: $groupId) {
    id
    name
    owner {
      id
      firstName
      lastName
      email
    }
    members {
      id
      firstName
      lastName
      email
    }
  }
}
    `;

/**
 * __useGroupByIdQuery__
 *
 * To run a query within a React component, call `useGroupByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupByIdQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGroupByIdQuery(baseOptions: Apollo.QueryHookOptions<GroupByIdQuery, GroupByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GroupByIdQuery, GroupByIdQueryVariables>(GroupByIdDocument, options);
      }
export function useGroupByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GroupByIdQuery, GroupByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GroupByIdQuery, GroupByIdQueryVariables>(GroupByIdDocument, options);
        }
export type GroupByIdQueryHookResult = ReturnType<typeof useGroupByIdQuery>;
export type GroupByIdLazyQueryHookResult = ReturnType<typeof useGroupByIdLazyQuery>;
export type GroupByIdQueryResult = Apollo.QueryResult<GroupByIdQuery, GroupByIdQueryVariables>;
export const AddMemberToGroupDocument = gql`
    mutation AddMemberToGroup($data: AddMembersInputType!, $groupId: Int!) {
  addMemberToGroup(data: $data, groupId: $groupId) {
    id
    name
    owner {
      id
      email
      firstName
      lastName
    }
    members {
      email
      id
      firstName
      lastName
    }
  }
}
    `;
export type AddMemberToGroupMutationFn = Apollo.MutationFunction<AddMemberToGroupMutation, AddMemberToGroupMutationVariables>;

/**
 * __useAddMemberToGroupMutation__
 *
 * To run a mutation, you first call `useAddMemberToGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMemberToGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMemberToGroupMutation, { data, loading, error }] = useAddMemberToGroupMutation({
 *   variables: {
 *      data: // value for 'data'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useAddMemberToGroupMutation(baseOptions?: Apollo.MutationHookOptions<AddMemberToGroupMutation, AddMemberToGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMemberToGroupMutation, AddMemberToGroupMutationVariables>(AddMemberToGroupDocument, options);
      }
export type AddMemberToGroupMutationHookResult = ReturnType<typeof useAddMemberToGroupMutation>;
export type AddMemberToGroupMutationResult = Apollo.MutationResult<AddMemberToGroupMutation>;
export type AddMemberToGroupMutationOptions = Apollo.BaseMutationOptions<AddMemberToGroupMutation, AddMemberToGroupMutationVariables>;
export const CreateMessageDocument = gql`
    mutation CreateMessage($data: NewMessageInputType!) {
  createMessage(data: $data) {
    id
    content
    sent_at
    writtenBy {
      id
      firstName
      lastName
    }
  }
}
    `;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const MessagesDocument = gql`
    query Messages($channelId: Int) {
  messages(channelId: $channelId) {
    id
    content
    sent_at
    writtenBy {
      id
      firstName
      lastName
    }
    channelId {
      id
    }
  }
}
    `;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useMessagesQuery(baseOptions?: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const NewMessageDocument = gql`
    subscription NewMessage($channelId: Int!) {
  newMessage(channelId: $channelId) {
    id
    content
    sent_at
    writtenBy {
      id
      firstName
      lastName
    }
    channelId {
      id
    }
  }
}
    `;

/**
 * __useNewMessageSubscription__
 *
 * To run a query within a React component, call `useNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useNewMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewMessageSubscription, NewMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewMessageSubscription, NewMessageSubscriptionVariables>(NewMessageDocument, options);
      }
export type NewMessageSubscriptionHookResult = ReturnType<typeof useNewMessageSubscription>;
export type NewMessageSubscriptionResult = Apollo.SubscriptionResult<NewMessageSubscription>;
export const CompleteProfileDocument = gql`
    mutation CompleteProfile($data: CompleteProfileInputType!, $token: String!) {
  completeProfile(data: $data, token: $token)
}
    `;
export type CompleteProfileMutationFn = Apollo.MutationFunction<CompleteProfileMutation, CompleteProfileMutationVariables>;

/**
 * __useCompleteProfileMutation__
 *
 * To run a mutation, you first call `useCompleteProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeProfileMutation, { data, loading, error }] = useCompleteProfileMutation({
 *   variables: {
 *      data: // value for 'data'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useCompleteProfileMutation(baseOptions?: Apollo.MutationHookOptions<CompleteProfileMutation, CompleteProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteProfileMutation, CompleteProfileMutationVariables>(CompleteProfileDocument, options);
      }
export type CompleteProfileMutationHookResult = ReturnType<typeof useCompleteProfileMutation>;
export type CompleteProfileMutationResult = Apollo.MutationResult<CompleteProfileMutation>;
export type CompleteProfileMutationOptions = Apollo.BaseMutationOptions<CompleteProfileMutation, CompleteProfileMutationVariables>;
export const LoginDocument = gql`
    mutation Login($data: LoginInputType!) {
  login(data: $data)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($data: NewUserInputType!) {
  createUser(data: $data) {
    id
    firstName
    lastName
    email
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($data: UpdateUserInputType!, $userId: String!) {
  updateUser(data: $data, userId: $userId) {
    id
    firstName
    lastName
    email
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const ProfileDocument = gql`
    query Profile {
  profile {
    id
    firstName
    lastName
    email
    role
    groups {
      id
      name
      members {
        id
        firstName
        lastName
        email
      }
    }
    memberGroups {
      name
      id
      members {
        firstName
        email
        lastName
      }
    }
  }
}
    `;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;