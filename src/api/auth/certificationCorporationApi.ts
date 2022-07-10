import graphQLClientRequest from '@api/graphQLClientRequest';

export enum CorporationType {
  CORPORATION,
  PRIVATE,
}
type QueryType = {
  representativeName: string;
  businessNumber: string;
  startDate: string;
  corporationType: string;
  corporationNumber?: string;
};

export default function certificationCorporationApi({representativeName, businessNumber, startDate, corporationType, corporationNumber}: QueryType): any {
  const request = `
      query{
        certificationCorporation(
            request: {
              representativeName: "${representativeName}"
              businessNumber: "${businessNumber.replace(/[^0-9]/g, '')}"
              startDate: "${startDate}"
              corporationType: ${corporationType}
              ${corporationNumber ? `corporationNumber: "${corporationNumber}"` : ''}
            },
          ) {
            id
          }
      }
  `;

  console.log('request', request);

  const response = graphQLClientRequest(request);
  return response;
}
