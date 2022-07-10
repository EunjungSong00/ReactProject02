import graphQLClientRequest from '@api/graphQLClientRequest';

export default function updateAssociatePartnerApi(password: string, context?: any): any {
  const query = `
  mutation {
    updateAssociatePartner(password:"${password}"){
                id
            }
        }
    `;

  // console.log('getPartnerOrderListApi', query);
  const response = graphQLClientRequest(query, context);
  console.log('response', response);
  return response;
}
