import graphQLClientRequest, {ApiOptionsType} from '@api/graphQLClientRequest';

export default function getCorporationPartnerApi(options?: ApiOptionsType): any {
  // console.info('getVehicleApi start');
  const query = `
        query {
              getCorporationPartner {
                id
                loginId
                name
                dealer{
                  companyName
                }
              }
        }
    `;

  if (options?.getGql) return query;
  // const response = await graphQLClientRequest(query, context);
  const response = graphQLClientRequest(query, options?.context);
  return response;
}
