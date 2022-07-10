import {gql} from 'graphql-request';
import graphQLClientRequest from '@api/graphQLClientRequest';

export default async function upsertVehicleLedgerOwnerNameApi(vehicleLedgerOwnerName: string, context?: any): Promise<any> {
  const mutation = gql`
     mutation {
      upsertVehicleLedgerOwnerName(
        vehicleLedgerOwnerName: "${vehicleLedgerOwnerName}"
      )
    }
    `;
  // console.info('upsertVehicleLedgerOwnerNameApi mutation', mutation);
  const response = await graphQLClientRequest(mutation, context);
  return response && response;
}
