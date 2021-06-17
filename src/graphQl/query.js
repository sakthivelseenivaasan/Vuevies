import gql from 'graphql-tag'

export const userList = gql`
    query{
        users{
        id
        email
        fullName
        role
        }
    }
  `