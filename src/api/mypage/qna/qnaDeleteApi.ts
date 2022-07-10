import {gql} from 'graphql-request';
import graphQLClientRequest from '@api/graphQLClientRequest';

export default async function qnaDeleteApi(id: number) {
  const query = gql`
  mutation{
          deleteQnA(
              id: ${id}
          ){
              id
          }
      }
  `;

  const response = await graphQLClientRequest(query, undefined);
  return response && response;
}
