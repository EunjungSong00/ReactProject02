import graphQLClientRequest from '@api/graphQLClientRequest';

export default function checkBankAccountAfterSendOtpApi(accountNumber: string, name: string, bankId: number, context?: any): any {
  const query = `
        query {
            checkBankAccountAfterSendOtp(bankAccountRequest:{
                accountNumber:"${accountNumber}"
                name:"${name}"
                bankId:${bankId}
            }){
                token
            }
          }
    `;

  // console.log('getPartnerOrderListApi', query);
  const response = graphQLClientRequest(query, context);
  console.log('response', response);
  return response;
}
