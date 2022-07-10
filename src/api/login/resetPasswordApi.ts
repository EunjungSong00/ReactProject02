import {gql, request} from 'graphql-request';

export default async function resetPasswordApi(password: string, token: string) {
  // console.info('password: ', password, 'token :', token);
  const endpoint = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : '';
  const query = gql`
  mutation {
    resetPassword(request:{
      password:"${password}"
      token:"${token}"
    }) {
      id
      email
    }
  }`;
  const response = await request(endpoint, query).catch((error) => {
    const extensions = error.response.errors[0].extensions;
    const errorMessage = error.response.errors[0].message;
    // console.info(extensions);
    alert(errorMessage);
    return undefined;
  });
  if (response) {
    // console.info(response);
  }

  return response;
}
