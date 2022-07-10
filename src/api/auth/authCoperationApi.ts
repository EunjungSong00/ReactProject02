import {gql, GraphQLClient, request} from 'graphql-request';

export default async function authCoperationApi(representativeName: string, businessNumber: string, startDate: string) {
  const endpoint = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : '';
  const token = localStorage.getItem('token');
  
  if (token) {
    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${token}`,
        'carmerce-partner-meta': process.env.NEXT_PUBLIC_DOMAIN?.includes('dev.') ? 'skip-validation' : ''
      }
    });

    const query = gql`
        query{
            authenticateCorporation(
              request: {
                      representativeName: "${representativeName}",
                      businessNumber: "${businessNumber.replace(/[^0-9]/g, '')}",
                      startDate: "${startDate}",
              },
            ) {
              id
            }
        }
    `;
    // // console.info('authCoperationApi', query);
    const response = await graphQLClient.request(query).catch((error) => {
      // const extensions = error.response.errors[0].extensions;
      const errorMessage = error.response;
      // // console.info(extensions);
      console.error('errorMessage', errorMessage);
      return errorMessage;
    });
    if (response) {
      // // console.info('authenticateCorporation', response);
    }

    return response;
  }
}
