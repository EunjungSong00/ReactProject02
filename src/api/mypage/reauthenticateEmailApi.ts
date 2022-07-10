import {gql} from 'graphql-request';
import graphQLClientRequest from '@api/graphQLClientRequest';

export default async function reauthenticateEmailApi(redirectUrl: string, email: string): Promise<any> {
  const query = gql`
    query {
        reauthenticateEmail(
          redirectUrl: "${redirectUrl}",
          email: "${email}"
        ) {
          count
          requestId
        }
      }
  `;
  const response = await graphQLClientRequest(query);
  return response && response;
}
