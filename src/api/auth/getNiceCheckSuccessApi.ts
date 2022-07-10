import {gql} from 'graphql-request';
import graphQLClientRequest from '@api/graphQLClientRequest';

export default async function getNiceCheckSuccessApi(encode: string) {
  // console.log('encode', encode);
  const query = gql`
      query{
          getNiceCheckSuccess(
            request: "${encode}"
          ) {
            birthDate
            name
            phoneNumber
            gender
            createdDate
            updatedDate
            nationalInformation
            id
          }
      }
  `;

  const response = await graphQLClientRequest(query, undefined);
  return response && response;
}
