import graphQLClientRequest, {ApiOptionsType} from '@api/graphQLClientRequest';

export default function getBanksApi(options?: ApiOptionsType): any {
  const query = `
    query {
      getBanks {
        id
        name
        available
        createdDate
        updatedDate
      }
    }
  `;

  // console.log('query', query);
  if (options?.getGql) return query;
  const response = graphQLClientRequest(query, options?.context);
  return response;
}
