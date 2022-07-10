import graphQLClientRequest from '@api/graphQLClientRequest';

export default function setVehicleColumnList(columnList: string[], context?: any): any {
  const mutation = `
  mutation {
    setVehicleColumnList(
      request: [${columnList.length === 0 ? '' : '"'}${columnList.toString().replaceAll(',', '","')}${columnList.length === 0 ? '' : '"'}]
    ) {
      vehicleColumnList
    }
  }
    `;
  // console.info('setVehicleColumnList mutation', mutation);
  const response = graphQLClientRequest(mutation, context);
  return response;
}
