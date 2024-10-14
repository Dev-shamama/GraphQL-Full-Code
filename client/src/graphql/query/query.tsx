export const GET_BANNER = `#graphql
query Banner {
    banner {
        imageLink
        status
        createAt
        id
    }
}`


export const ADD_BANNER = `#graphql
mutation Mutation($imageLink: String!, $status: String) {
    createBanner(imageLink: $imageLink, status: $status) {
      imageLink
      status
    }
  }`


export const UPLOAD_BANNER = `#graphql
mutation singleUpload($file: Upload!) {
  singleUpload(file: $file) {
    url
  }
}`
