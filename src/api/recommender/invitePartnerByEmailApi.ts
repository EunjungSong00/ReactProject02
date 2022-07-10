import graphQLClientRequest from '@api/graphQLClientRequest';

export default function invitePartnerByEmailApi(email: string): any {
  const mutation = `
    mutation {
      invitePartnerByEmail(request: {
        email: "${email}",
        redirectUrl:"${process.env.NEXT_PUBLIC_DOMAIN}/login/signup"
      }) {
        requestId
      }
    }
  `;

  // console.log('invitePartnerByEmail mutation', mutation);
  const response = graphQLClientRequest(mutation);
  return response;
}
