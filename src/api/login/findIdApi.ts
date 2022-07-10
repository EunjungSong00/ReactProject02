import {gql, request} from 'graphql-request';

export default async function findIdApi(email: string) {
  const endpoint = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : '';
  const query = gql`
        query{
            findLoginId(
                    email: "${email}"
            )
        }
    `;
  const response = await request(endpoint, query).catch((error) => {
    const extensions = error.response.errors[0].extensions;
    const errorMessage = error.response.errors[0].message;
    // console.info(extensions);
    // alert(errorMessage);
    return;
  });
  if (response) {
    // console.info(response);
  }

  return response && response.findLoginId && response.findLoginId;
}
