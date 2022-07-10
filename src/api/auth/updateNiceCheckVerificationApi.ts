import {gql} from 'graphql-request';
import graphQLClientRequest from '@api/graphQLClientRequest';

export default async function updateNiceCheckVerificationApi(encode: string) {
  const query = gql`
      query{
        updateNiceCheckVerification(
            request: "${encode}"
          ) {
            name
            birthDate
            gender
            phoneNumber
            nationalInformation
          }
      }
  `;

  const response = await graphQLClientRequest(query, undefined);
  return response;
}
