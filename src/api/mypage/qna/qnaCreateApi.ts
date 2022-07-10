import {gql} from 'graphql-request';
import graphQLClientRequest from '@api/graphQLClientRequest';

type QueryType = {
  category?: string;
  contents?: string;
  title: string;
};

export default async function qnaCreateApi({category, contents, title}: QueryType) {
  const query = gql`
  mutation{
    createQnA(
      params:{
        category: "${category}",
        content: "${contents}",
        title: "${title}"
      }
    )
    {
      id
      content
    }
  }
  `;

  const response = await graphQLClientRequest(query, undefined);
  return response && response;
}
