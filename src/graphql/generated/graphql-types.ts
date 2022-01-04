import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Bookmark = {
  __typename?: 'Bookmark';
  id: Scalars['ID'];
  story: Story;
};

export type Mutation = {
  __typename?: 'Mutation';
  addBookmark?: Maybe<Bookmark>;
  removeBookmark?: Maybe<Scalars['Boolean']>;
};

export type MutationAddBookmarkArgs = {
  storyId: Scalars['ID'];
};

export type MutationRemoveBookmarkArgs = {
  bookmarkId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  bookmarks?: Maybe<Array<Bookmark>>;
  stories?: Maybe<Array<Story>>;
  story?: Maybe<Story>;
};

export type QueryStoryArgs = {
  id: Scalars['ID'];
};

export type Story = {
  __typename?: 'Story';
  author?: Maybe<Scalars['String']>;
  bookmarkId?: Maybe<Scalars['ID']>;
  id: Scalars['ID'];
  summary: Scalars['String'];
  text?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export const AllStoriesDocument = gql`
  query AllStories {
    stories {
      id
      title
      author
      summary
    }
  }
`;

export function useAllStoriesQuery(
  options: Omit<Urql.UseQueryArgs<AllStoriesQueryVariables>, 'query'> = {},
) {
  return Urql.useQuery<AllStoriesQuery>({
    query: AllStoriesDocument,
    ...options,
  });
}
export const StoryByIdDocument = gql`
  query StoryById($id: ID!) {
    story(id: $id) {
      id
      title
      summary
      text
      author
      bookmarkId
    }
  }
`;

export function useStoryByIdQuery(
  options: Omit<Urql.UseQueryArgs<StoryByIdQueryVariables>, 'query'> = {},
) {
  return Urql.useQuery<StoryByIdQuery>({
    query: StoryByIdDocument,
    ...options,
  });
}
export type AllStoriesQueryVariables = Exact<{ [key: string]: never }>;

export type AllStoriesQuery = {
  __typename?: 'Query';
  stories?:
    | Array<{
        __typename?: 'Story';
        id: string;
        title: string;
        author?: string | null | undefined;
        summary: string;
      }>
    | null
    | undefined;
};

export type StoryByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type StoryByIdQuery = {
  __typename?: 'Query';
  story?:
    | {
        __typename?: 'Story';
        id: string;
        title: string;
        summary: string;
        text?: string | null | undefined;
        author?: string | null | undefined;
        bookmarkId?: string | null | undefined;
      }
    | null
    | undefined;
};

export const AllStories = gql`
  query AllStories {
    stories {
      id
      title
      author
      summary
    }
  }
`;
export const StoryById = gql`
  query StoryById($id: ID!) {
    story(id: $id) {
      id
      title
      summary
      text
      author
      bookmarkId
    }
  }
`;
