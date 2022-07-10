import {gql, request} from 'graphql-request';

export default async function findPasswordApi(id: string, email: string, redirectUrl: string):Promise<any> {
  const endpoint = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : '';
  const query = gql`
        query{
            findPassword(
              request:{
                    loginId: "${id}"
                    email: "${email}"
                    redirectUrl: "${redirectUrl}"
              }
            ) {
                requestId
                count
            }
        }
    `;
  const response = await request(endpoint, query).catch((error) => {
    const {extensions} = error.response.errors[0];
    const errorMessage = error.response.errors[0].message;
    console.error(extensions);
    console.error(errorMessage);
    return error;
  });
  if (response) {
    // console.info(response);
  }

  return response;
}
