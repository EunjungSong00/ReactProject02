import graphQLClientRequest from '@api/graphQLClientRequest';

export default function confirmOtpApi(otpNumber: string, token: string, context?: any): any {
  const query = `
        query {
            confirmOtp(otpRequest:{
                otpNumber:"${otpNumber}"
                token:"${token}"
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
