import {gql} from 'graphql-request';
import graphQLClientRequest from '@api/graphQLClientRequest';

export default async function getQnaApi(id: number, context: any) {
  const query = gql`
      query{
          getQnA(
            id: ${id}
          ) {
            answer
            answerUser
            category
            content
            createdDate
            id
            status
            title
          }
      }
  `;
  const response = await graphQLClientRequest(query, context);
  return response && response;
}
