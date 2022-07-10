import {gql} from 'graphql-request';
import graphQLClientRequest from '@api/graphQLClientRequest';

type QueryType = {
  address: string;
  corporationId: string;
  dealerId: string;
  detailAddress: string;
  identityAuthenticationId: string;
  position: number;
  vehicleLedgerOwnerName: string;
  zipCode: string;
};

export enum EPartnerPosition {
  OWNER,
  DEALER
}

export default async function signUpPartnerApi({address, corporationId, dealerId, detailAddress, identityAuthenticationId, position, vehicleLedgerOwnerName, zipCode}: QueryType) {
  const request = gql`
      mutation{
          signUpPartner(
            request: {
              address: "${address}",
              corporationId: "${corporationId}",
              dealerId: "${dealerId}",
              detailAddress: "${detailAddress}",
              identityAuthenticationId: "${identityAuthenticationId}",
              position: ${position},
              ${vehicleLedgerOwnerName ? `vehicleLedgerOwnerName: "${vehicleLedgerOwnerName}"` : ''}
              zipCode: "${zipCode}",
            },
          ) {
            id
          }
      }
  `;

  const response = await graphQLClientRequest(request, undefined);
  return response && response;
}
