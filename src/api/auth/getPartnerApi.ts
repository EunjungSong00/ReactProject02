import {gql} from 'graphql-request';
import graphQLClientRequest from '@api/graphQLClientRequest';

export default async function getPartnerApi() {
  const query = gql`
    query {
      getPartner {
        id
        level
        name
        loginId
        email
        status
        phoneNumber
        emailAuthDate
        vehicleLedgerOwnerName
        corporation {
          id
          representativeName
          address
          businessNumber
          corporationType
          corporationNumber
          zipCode
          corporationSettlementAccount {
            id
          }
        }
        registerSettlementAccount
        identityAuthentication {
          birthDate
          name
          phoneNumber
          id
        }
        dealer {
          id
          assocType
          dealerName
          dealerNum
          companyName
          complexName
        }
      }
    }
  `;

  const response = await graphQLClientRequest(query, undefined);
  return response && response;
}
