import graphQLClientRequest from '@api/graphQLClientRequest';

type queryType = {loginId: string; password: string};

export default function checkPartnerApi({loginId, password}: queryType): any {
  const query = `
    query {
      checkPartner(
        request:{
            loginId: "${loginId}",
            password: "${password}"
        }){
            id
            level
            position
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
                startDate
                detailAddress
                corporationSettlementAccount {
                  bank {
                    id
                    name
                  }
                  accountHolder
                  number
                }
            }
            identityAuthentication{
                birthDate
                name
                phoneNumber
                id
                name
            }
            dealer{
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
  const response = graphQLClientRequest(query, undefined);
  return response;
}
