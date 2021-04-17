export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Activity = Node & {
  __typename?: 'Activity';
  /** ID of the activity */
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
  linkToDetails?: Maybe<Scalars['String']>;
  trip: Trip;
  routePoint: TripRoutePoint;
  addedByUser: User;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt: Scalars['DateTime'];
};

export type CreateActivityInput = {
  routePointId: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  linkToDetails?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
};

export type CreateInvitationInput = {
  tripId: Scalars['String'];
};

export type CreateTripInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
};

export type CreateTripRoutePointInput = {
  /** The position (sequence number) of this route point in the trip */
  positionInTrip?: Maybe<Scalars['Int']>;
  /** The trip route point after which this new point should be added (else it will be added at the end) */
  afterRoutePointId?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  linkToMap?: Maybe<Scalars['String']>;
  tripId: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type CreateUserInput = {
  /** Username of the user */
  username: Scalars['String'];
  /** Display Name of the user */
  displayName: Scalars['String'];
  /** Password of the user */
  password: Scalars['String'];
  /** Email of the user */
  email: Scalars['String'];
  /** Verification captcha token to avoid spam */
  captchaToken: Scalars['String'];
};


export type Invitation = Node & {
  __typename?: 'Invitation';
  /** ID of the invitation */
  id: Scalars['ID'];
  tripId: Scalars['String'];
  trip: Trip;
  acceptedUsersCount: Scalars['Int'];
  status: InvitationStatus;
  createdByUser: User;
};

export enum InvitationStatus {
  Open = 'OPEN',
  Full = 'FULL',
  Revoked = 'REVOKED'
}

export type JoinTripInput = {
  tripId: Scalars['String'];
  invitationId: Scalars['String'];
};

export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  user: User;
  token: Scalars['String'];
};

export type MoveTripRoutePointInput = {
  routePointId: Scalars['String'];
  moveUp: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTrip: Trip;
  joinTrip: Trip;
  leaveTrip: Trip;
  removeTrip: MutationResult;
  updateTrip: Trip;
  createTripRoutePoint: TripRoutePoint;
  updateTripRoutePoint: TripRoutePoint;
  moveTripRoutePoint: TripRoutePoint;
  removeTripRoutePoint: TripRoutePoint;
  login: LoginResult;
  refreshToken: LoginResult;
  createUser: User;
  updateUser: User;
  createActivity: Activity;
  updateActivity: Activity;
  removeActivity: MutationResult;
  createInvitation: Invitation;
  updateInvitation: Invitation;
};


export type MutationCreateTripArgs = {
  data: CreateTripInput;
};


export type MutationJoinTripArgs = {
  data: JoinTripInput;
};


export type MutationLeaveTripArgs = {
  tripId: Scalars['String'];
};


export type MutationRemoveTripArgs = {
  tripId: Scalars['ID'];
};


export type MutationUpdateTripArgs = {
  data: UpdateTripInput;
};


export type MutationCreateTripRoutePointArgs = {
  data: CreateTripRoutePointInput;
};


export type MutationUpdateTripRoutePointArgs = {
  data: UpdateTripRoutePointInput;
};


export type MutationMoveTripRoutePointArgs = {
  data: MoveTripRoutePointInput;
};


export type MutationRemoveTripRoutePointArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  user: LoginInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};


export type MutationCreateActivityArgs = {
  data: CreateActivityInput;
};


export type MutationUpdateActivityArgs = {
  data: UpdateActivityInput;
};


export type MutationRemoveActivityArgs = {
  id: Scalars['String'];
};


export type MutationCreateInvitationArgs = {
  data: CreateInvitationInput;
};


export type MutationUpdateInvitationArgs = {
  data: UpdateInvitationInput;
};

export type MutationResult = {
  __typename?: 'MutationResult';
  successful: Scalars['Boolean'];
  idOfDeletedItem: Scalars['String'];
  tripId?: Maybe<Scalars['String']>;
};

export type Node = {
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  trips: Array<Trip>;
  tripRoutePoint: TripRoutePoint;
  user: User;
  activities: Array<Activity>;
  invitation: Invitation;
  node?: Maybe<Node>;
};


export type QueryTripsArgs = {
  includeHistorical?: Maybe<Scalars['Boolean']>;
};


export type QueryTripRoutePointArgs = {
  id: Scalars['String'];
};


export type QueryActivitiesArgs = {
  tripId: Scalars['String'];
};


export type QueryInvitationArgs = {
  invitationId: Scalars['String'];
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  routePointsChanged: TripRoutePointsChangedResult;
  activityAdded: Activity;
};


export type SubscriptionRoutePointsChangedArgs = {
  tripId: Scalars['String'];
};


export type SubscriptionActivityAddedArgs = {
  tripId: Scalars['String'];
};

export enum SubscriptionChangeType {
  Add = 'ADD',
  Remove = 'REMOVE',
  Update = 'UPDATE'
}

export type Trip = Node & {
  __typename?: 'Trip';
  /** ID of the trip */
  id: Scalars['ID'];
  /** Name of the trip */
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  /** @deprecated asdf */
  nameTestDeprecation?: Maybe<Scalars['String']>;
  admin: User;
  members: Array<TripMember>;
  startDate?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  totalDistance?: Maybe<Scalars['Float']>;
  itinerary: Array<TripRoutePoint>;
  activities?: Maybe<Array<Activity>>;
  createdAt: Scalars['DateTime'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type TripMember = Node & {
  __typename?: 'TripMember';
  /** ID of this trip route point */
  id: Scalars['ID'];
  tripId: Scalars['String'];
  trip: Trip;
  userId: Scalars['String'];
  user: User;
  role: TripUserRole;
  color: Scalars['String'];
};

export type TripRoutePoint = Node & {
  __typename?: 'TripRoutePoint';
  /** ID of this trip route point */
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  acivities?: Maybe<Array<Activity>>;
  /** The position (sequence number) of this route point in the trip */
  positionInTrip?: Maybe<Scalars['Int']>;
  previousTripRoutePoint?: Maybe<TripRoutePoint>;
  nextTripRoutePoint?: Maybe<TripRoutePoint>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  linkToMap?: Maybe<Scalars['String']>;
  trip: Trip;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt: Scalars['DateTime'];
  activities: Array<Activity>;
};

export type TripRoutePointsChangedResult = {
  __typename?: 'TripRoutePointsChangedResult';
  changeType: SubscriptionChangeType;
  changedBy: User;
  data: TripRoutePoint;
};

export enum TripUserRole {
  Admin = 'ADMIN',
  Member = 'MEMBER'
}

export type UpdateActivityInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  linkToDetails?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
  activityId: Scalars['String'];
};

export type UpdateInvitationInput = {
  invitationId: Scalars['String'];
  status?: Maybe<InvitationStatus>;
  acceptedUsersCount?: Maybe<Scalars['Int']>;
};

export type UpdateTripInput = {
  /** Name of the trip */
  name?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  tripId: Scalars['String'];
};

export type UpdateTripRoutePointInput = {
  /** The position (sequence number) of this route point in the trip */
  positionInTrip?: Maybe<Scalars['Int']>;
  /** The trip route point after which this new point should be added (else it will be added at the end) */
  afterRoutePointId?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  linkToMap?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  routePointId: Scalars['String'];
};

export type UpdateUserInput = {
  /** Display Name of the user */
  displayName?: Maybe<Scalars['String']>;
  /** Password of the user */
  password?: Maybe<Scalars['String']>;
  /** Email of the user */
  email?: Maybe<Scalars['String']>;
  /** Verification captcha token to avoid spam */
  captchaToken?: Maybe<Scalars['String']>;
  /** User ID of the user to be updated */
  userIdToUpdate: Scalars['String'];
};

export type User = Node & {
  __typename?: 'User';
  /** ID of the user */
  id: Scalars['ID'];
  /** Username of the user */
  username: Scalars['String'];
  /** Display Name of the user */
  displayName: Scalars['String'];
  /** Email of the user */
  email: Scalars['String'];
};
