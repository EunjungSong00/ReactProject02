import {gql, request} from 'graphql-request';

export default async function signupApi(email: string, loginId: string, password: string, recommenderLoginId: string, redirectUrl: string) {
  const endpoint = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : '';
  const query = gql`
    mutation{
            signUpAssociatePartner(temporaryPartner:{
                    email: "${email}"
                    loginId: "${loginId}",
                    password: "${password}"
                    recommenderLoginId: "${recommenderLoginId}"
                    redirectUrl: "${redirectUrl}"
                    signUpChannel: PC
                    signUpPath: CARMERCE
                } 
            ){
                requestId
                count
            }
        }
    `;
  // console.info('signupApi ', query);
  const response = await request(endpoint, query).catch((error) => {
    const {extensions} = error.response.errors[0];
    const errorMessage = error.response.errors[0].message;
    // console.info(extensions);
    alert(errorMessage);
    return undefined;
  });
  if (response) {
    // console.info('signupApi requestId ', response.signUpAssociatePartner.requestId);
  }

  return response && response.signUpAssociatePartner.requestId;
}
