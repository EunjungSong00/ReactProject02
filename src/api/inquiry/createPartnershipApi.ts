import {gql, GraphQLClient, request} from 'graphql-request';

export default async function createPartnershipApi(
  content: string,
  corporationName: string,
  departmentName: string,
  email: string,
  name: string,
  phoneNumber: string,
  title: string,
  telPhoneNumber: string,
  position: string
) {
  const endpoint = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : '';

  const query = gql`
    mutation{
        createPartnership(
          request:{
              content: "${content.replaceAll('\n', '<br>')}"
              corporationName: "${corporationName}"
              departmentName: "${departmentName}"
              email: "${email}"
              name: "${name}"
              phoneNumber: "${phoneNumber}"
              title: "${title}"
              telPhoneNumber: "${telPhoneNumber}"
              position: "${position}"
        }){
            answer
            answerAdmin
            answerDate
            content
            corporationName
            createdDate
            departmentName
            email
            id
            name
            phoneNumber
            position
            status
            telePhoneNumber
            title
            updatedDate
        }
    }
    `;

  // console.info('createPartnershipApi query', query);
  const response = await request(endpoint, query).catch((error) => {
    const errorMessage = error.response?.errors[0].message;
    console.error('errorMessage', errorMessage);
    return errorMessage;
  });
  if (response) {
    // console.info('createPartnershipApi', response);
  }
  return response;
}
