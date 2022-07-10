import {gql} from 'graphql-request';
import graphQLClientRequest from '@api/graphQLClientRequest';

type queryType = {
  accountHolder: string;
  accountNumber: string;
  bankId: number;
  token: string;
};

export default async function updateCorporationSettlementAccount({accountHolder, accountNumber, bankId, token}: queryType) {
  const query = gql`
  mutation{
    updateCorporationSettlementAccount(request:{
        accountHolder: "${accountHolder}"
        accountNumber: "${accountNumber}"
        bankId: "${bankId}"
        token: "${token}"
    }){
      id
    }
  }
  `;

  const response = await graphQLClientRequest(query);
  return response && response;
}
