import {gql} from 'graphql-request';
import graphQLClientRequest from '@api/graphQLClientRequest';

type QueryType = {
  id: number;
  category: string;
  content: string;
  title: string;
};

export default async function qnaUpdateApi({id, category, content, title}: QueryType) {
  const query = gql`
    mutation{
      updateQnA(
        id: ${id},
        params:{
          category: "${category}",
          content: "${content}",
          title: "${title}"
        } 
      ){
        id
      }
    }
  `;

  const response = await graphQLClientRequest(query, undefined);
  return response && response;
}
