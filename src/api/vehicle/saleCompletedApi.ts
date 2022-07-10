import graphQLClientRequest from '@api/graphQLClientRequest';

export type SaleCompletedType = {
  id: number;
  saleDate: string;
  sale: number;
};

export default function saleCompletedApi({id, saleDate, sale}: SaleCompletedType, context?: any): Promise<any> {
  const query = `
  mutation{
    saleCompleted(
        id: ${id}
        request: {
          saleDate: "${saleDate} 00:00:00"
          salePrice: ${sale}
      }){
            id
        }
    }
  `;

  // console.log('saleCompletedApi query', query);
  const response = graphQLClientRequest(query, context);
  return response;
}
