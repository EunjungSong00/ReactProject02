import graphQLClientRequest from '@api/graphQLClientRequest';

export default function updateVehicleSaleHoldStatusApi(id: number): any {
  const mutation = `
  mutation {
    updateVehicleSaleHoldStatus(id: ${id}) {
      id
      status
    }
  }
  
    `;
  //   console.log('updateVehicleSaleHoldStatus', mutation);
  return graphQLClientRequest(mutation);
}
