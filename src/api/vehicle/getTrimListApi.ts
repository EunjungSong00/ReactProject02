import graphQLClientRequest, {ApiOptionsType} from '@api/graphQLClientRequest';

export default function getTrimListApi(id: any, options?: ApiOptionsType) {
  const query = `
        query {
            getTrimList(
                id: ${id}
              ) {
                value : jatoVehicleId
                label : modelTrim
              }
        }
    `;

  if (options?.getGql) return query;
  // const response = await graphQLClientRequest(query, context);
  const response = graphQLClientRequest(query, options?.context);
  return response;
}
