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

export const StorySummaryFieldsFragmentDoc = gql`
  fragment StorySummaryFields on Story {
    summary
    title
    id
    bookmarkId
  }
`;
export const StoryBookMarkFragmentFragmentDoc = gql`
  fragment StoryBookMarkFragment on Story {
    id
    bookmarkId
  }
`;
export const AddBookmarkDocument = gql`
  mutation AddBookmark($storyId: ID!) {
    addBookmark(storyId: $storyId) {
      id
      story {
        ...StorySummaryFields
      }
    }
  }
  ${StorySummaryFieldsFragmentDoc}
`;

export function useAddBookmarkMutation() {
  return Urql.useMutation<AddBookmarkMutation, AddBookmarkMutationVariables>(
    AddBookmarkDocument,
  );
}
export const AllBookmarksDocument = gql`
  query AllBookmarks {
    bookmarks {
      id
      story {
        ...StorySummaryFields
      }
    }
  }
  ${StorySummaryFieldsFragmentDoc}
`;

export function useAllBookmarksQuery(
  options: Omit<Urql.UseQueryArgs<AllBookmarksQueryVariables>, 'query'> = {},
) {
  return Urql.useQuery<AllBookmarksQuery>({
    query: AllBookmarksDocument,
    ...options,
  });
}
export const RemoveBookmarkDocument = gql`
  mutation RemoveBookmark($bookmarkId: ID!) {
    removeBookmark(bookmarkId: $bookmarkId)
  }
`;

export function useRemoveBookmarkMutation() {
  return Urql.useMutation<
    RemoveBookmarkMutation,
    RemoveBookmarkMutationVariables
  >(RemoveBookmarkDocument);
}
export const AllStoriesDocument = gql`
  query AllStories {
    stories {
      ...StorySummaryFields
    }
  }
  ${StorySummaryFieldsFragmentDoc}
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
export type AddBookmarkMutationVariables = Exact<{
  storyId: Scalars['ID'];
}>;

export type AddBookmarkMutation = {
  __typename?: 'Mutation';
  addBookmark?:
    | {
        __typename?: 'Bookmark';
        id: string;
        story: {
          __typename?: 'Story';
          summary: string;
          title: string;
          id: string;
          bookmarkId?: string | null | undefined;
        };
      }
    | null
    | undefined;
};

export type AllBookmarksQueryVariables = Exact<{ [key: string]: never }>;

export type AllBookmarksQuery = {
  __typename?: 'Query';
  bookmarks?:
    | Array<{
        __typename?: 'Bookmark';
        id: string;
        story: {
          __typename?: 'Story';
          summary: string;
          title: string;
          id: string;
          bookmarkId?: string | null | undefined;
        };
      }>
    | null
    | undefined;
};

export type StorySummaryFieldsFragment = {
  __typename?: 'Story';
  summary: string;
  title: string;
  id: string;
  bookmarkId?: string | null | undefined;
};

export type StoryBookMarkFragmentFragment = {
  __typename?: 'Story';
  id: string;
  bookmarkId?: string | null | undefined;
};

export type RemoveBookmarkMutationVariables = Exact<{
  bookmarkId: Scalars['ID'];
}>;

export type RemoveBookmarkMutation = {
  __typename?: 'Mutation';
  removeBookmark?: boolean | null | undefined;
};

export type AllStoriesQueryVariables = Exact<{ [key: string]: never }>;

export type AllStoriesQuery = {
  __typename?: 'Query';
  stories?:
    | Array<{
        __typename?: 'Story';
        summary: string;
        title: string;
        id: string;
        bookmarkId?: string | null | undefined;
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

export const StorySummaryFields = gql`
  fragment StorySummaryFields on Story {
    summary
    title
    id
    bookmarkId
  }
`;
export const StoryBookMarkFragment = gql`
  fragment StoryBookMarkFragment on Story {
    id
    bookmarkId
  }
`;
export const AddBookmark = gql`
  mutation AddBookmark($storyId: ID!) {
    addBookmark(storyId: $storyId) {
      id
      story {
        ...StorySummaryFields
      }
    }
  }
  ${StorySummaryFields}
`;
export const AllBookmarks = gql`
  query AllBookmarks {
    bookmarks {
      id
      story {
        ...StorySummaryFields
      }
    }
  }
  ${StorySummaryFields}
`;
export const RemoveBookmark = gql`
  mutation RemoveBookmark($bookmarkId: ID!) {
    removeBookmark(bookmarkId: $bookmarkId)
  }
`;
export const AllStories = gql`
  query AllStories {
    stories {
      ...StorySummaryFields
    }
  }
  ${StorySummaryFields}
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
