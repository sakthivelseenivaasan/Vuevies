import gql from 'graphql-tag'

export const loginRequest = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        success
        message
        token
        user{
            fullName
            role
        }
        }
    }  
  `
export const signUpRequest = gql`
    mutation signup($email:String!,$password:String!,$rePassword:String!,$fullName:String!){
        signup(signupReq:{email:$email,password:$password,rePassword:$rePassword,fullName:$fullName,,role:$role}){
        success
        user{
            id
            fullName
            email
        }
        message
        }
    }
`
export const deleteUser = gql`
    mutation deleteuser($id:ID!){
        deleteUser(id:$id){
            id
            fullName
        }
    }
`