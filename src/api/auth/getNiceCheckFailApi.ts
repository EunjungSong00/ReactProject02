import {gql} from 'graphql-request';
import graphQLClientRequest from '@api/graphQLClientRequest';

export default async function getNiceCheckFailApi(encode: string) {
  const query = gql`
      query{
          getNiceCheckFail(
            request: "${encode}"
          ) {
            errorCode
            requestNumber
          }
      }
  `;

  const response = await graphQLClientRequest(query, undefined);
  return response && response;
}
