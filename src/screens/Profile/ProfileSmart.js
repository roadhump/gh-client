import React from 'react';
import {compose, withHandlers} from 'recompose';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

import Profile from './Profile';

const ProfileSmart = compose(
  graphql(
    gql`
      query(
        $login: String!
        $repositoriesCursor: String
      ) {
        user(login: $login) {
          login
          name
          avatarUrl(size: 100)
          repositories(
            first: 5
            after: $repositoriesCursor
          ) {
            nodes {
              id
              name
              url
              description
              viewerHasStarred
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
      }
    `,
    {
      options: ({match}) => ({
        variables: {
          login: match.params.name || 'roadhump',
        },
        errorPolicy: 'all',
      }),
      props: ({data: {user, loading, fetchMore}}) => ({
        user,
        loading,
        fetchMore,
      })
    }
  ),
  graphql(
    gql`
      mutation (
        $id: ID!
      ) {
        addStar(input: {starrableId: $id}) {
          starrable {
            id
            viewerHasStarred
          }
        }
      }
    `,
    {
      name: 'starRepositoryMutation',
      props: ({starRepositoryMutation}) => ({
        onStarAdd: (id) => {

          return starRepositoryMutation({
            variables: {
              id,
            },
            optimisticResponse: {
              addStar: {
                __typename: 'Mutation',
                starrable: {
                  __typename: 'Repository',
                  id,
                  viewerHasStarred: true,
                }
              }
            },
          });

        },

      }),
    },
  ),
  graphql(
    gql`
      mutation (
        $id: ID!
      ) {
        removeStar(input: {starrableId: $id}) {
          starrable {
            id
            viewerHasStarred
          }
        }
      }
    `,
    {
      name: 'unstarRepositoryMutation',
      props: ({unstarRepositoryMutation}) => ({
        onStarRemove: (id) => {

          return unstarRepositoryMutation({
            variables: {
              id,
            },
            optimisticResponse: {
              addStar: {
                __typename: 'Mutation',
                starrable: {
                  __typename: 'Repository',
                  id,
                  viewerHasStarred: false,
                }
              }
            },
          });

        },

      }),
    },
  ),
  withHandlers({
    onLoadMoreRepositories: ({fetchMore}) => (cursor) => fetchMore({
      variables: {
        repositoriesCursor: cursor,
      },
      updateQuery: (previousResult, {fetchMoreResult}) => {

        if (!fetchMoreResult) return previousResult;

        return {
          ...previousResult,
          user: {
            ...previousResult.user,
            repositories: {
              ...previousResult.user.repositories,
              ...fetchMoreResult.user.repositories,
              nodes: [
                ...previousResult.user.repositories.nodes,
                ...fetchMoreResult.user.repositories.nodes,
              ],
            }
          }
        };
      },
    })
  })
)(Profile);

export default ProfileSmart;
