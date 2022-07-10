import graphQLClientRequest, {ContextType} from '@api/graphQLClientRequest';

export default function getNoticeApi(id: number, context?: ContextType): any {
  const query = `
      query {
         getNotice (
              id: ${id},
         ) {
              next,
              previous,
              notice {
                title
                content
                createdDate
                id
              }
         }
      }
  `;

  const response = graphQLClientRequest(query, context);
  return response;
}
