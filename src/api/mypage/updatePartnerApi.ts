import {gql} from 'graphql-request';
import graphQLClientRequest from '@api/graphQLClientRequest';

type queryType = {
  address: string;
  corporationId: number;
  dealerId: string;
  detailAddress: string;
  identityAuthenticationId: string;
  vehicleLedgerOwnerName: string;
  zipCode: string;
  password: string;
};

export default async function updatePartnerApi({
  address,
  corporationId,
  dealerId,
  detailAddress,
  identityAuthenticationId,
  vehicleLedgerOwnerName,
  zipCode,
  password
}: queryType): Promise<any> {
  const query = `
    mutation{
      updatePartner(
        request: {
          address: "${address}",
          corporationId: "${corporationId}",
          dealerId: "${dealerId}",
          detailAddress: "${detailAddress}",
          identityAuthenticationId: "${identityAuthenticationId}",
          vehicleLedgerOwnerName: "${vehicleLedgerOwnerName}",
          zipCode: "${zipCode}",
          ${password ? `password: "${password}"` : ''}
        }
      ) {
        id
      }
    }
  `;
  const response = await graphQLClientRequest(query);
  return response && response;
}
