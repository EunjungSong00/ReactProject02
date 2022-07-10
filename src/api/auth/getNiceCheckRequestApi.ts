import {gql} from 'graphql-request';
import graphQLClientRequest from '@api/graphQLClientRequest';

export default async function getNiceCheckRequestApi() {
  const url = process.env.NEXT_PUBLIC_DOMAIN ? process.env.NEXT_PUBLIC_DOMAIN : '';

  const query = gql`
    query {
      getNiceCheckRequest(
        request:
         {
           errorUrl: "${url}/auth/error", 
          #  returnUrl: "http://api.carmerce.co.kr/dev/carmerce/identity-authentication/encode-data"
           returnUrl: "${url}/auth/nice"
         }
      )
    }
  `;

  const response = await graphQLClientRequest(query, undefined);
  return response && response;
}
