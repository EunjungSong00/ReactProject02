import {gql} from 'graphql-request';
import graphQLClientRequest from '@api/graphQLClientRequest';

type QueryType = {
  dealersAssociationType: EDealersAssociationType;
  dealerName: string;
  dealerNum: string;
};

export enum EDealersAssociationType {
  KOREA,
  NATION
}

export default async function authenticateDealerApi({dealersAssociationType, dealerName, dealerNum}: QueryType) {
  const request = gql`
      query{
          authenticateDealer(
            request: {
              dealerName: "${dealerName}",
              dealerNum: "${dealerNum}",
              dealersAssociationType: ${dealersAssociationType},
            },
          ) {
            dealerName,
            id,
            dealerNum,
            assocType
          }
      }
  `;

  // console.log('res112', request);
  const response = await graphQLClientRequest(request, undefined);
  return response && response;
}
