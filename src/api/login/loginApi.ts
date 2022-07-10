import {request} from 'graphql-request';

export default async function loginApi(id: string, password: string): Promise<any> {
  const endpoint = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : '';
  const query = `
        query{
            signIn(request:{
                    loginId: "${id.trim()}",
                    password: "${password}"
                }
            ) {
                accessToken
                refreshToken
                partner {
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
        }
    `;
  // console.log(query);
  const response = await request(endpoint, query).catch((error) => error);

  return response;
}
