import {gql} from 'graphql-request';
import graphQLClientRequest from '@api/graphQLClientRequest';

interface IQuery {
  accountHolder: string;
  accountNumber: string;
  bankId: number;
  token: string;
}

export default async function createCorporationSettlementAccountApi({accountHolder, accountNumber, bankId, token}: IQuery) {
  const query = gql`
    mutation {
      createCorporationSettlementAccount(request:{
        accountHolder: "${accountHolder}",
        accountNumber: "${accountNumber}",
        bankId : ${bankId},
        token: "${token}"
      }){
        id
      }
    }
  `;
  const response = await graphQLClientRequest(query);
  return response && response;
}
