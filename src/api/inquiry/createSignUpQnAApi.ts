import {gql, request} from 'graphql-request';

export default async function createSignUpQnAApi(content: string, email: string, name: string, title: string) {
  const endpoint = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : '';
  const query = gql`
    mutation{
        createSignUpQnA(
          request:{
              content: "${content.replaceAll('\n', '<br>')}"
              email: "${email}"
              name: "${name}"
              title: "${title}"
        }){
            answer
            answerUser
            createdDate
            email
            name
            status
            title
        }
    }
    `;
  // console.info('createSignUpQnAApi ', query);
  const response = await request(endpoint, query).catch((error) => {
    const errorMessage = error.response?.errors[0].message;
    console.error('errorMessage', errorMessage);
    return errorMessage;
  });
  if (response) {
    // console.info('createSignUpQnAApi', response);
  }
  return response;
}
