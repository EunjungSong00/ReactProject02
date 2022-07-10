import graphQLClientRequest from '@api/graphQLClientRequest';

export enum VehicleAddOptionType {
  BLACKBOX,
  HIPASS
}

export default function upsertVehicleOptionsApi(
  addOptionIds?: VehicleAddOptionType,
  highlightOptionIds?: string[],
  vehicleId?: number
  ): any {
  const mutation = `
  mutation {
    upsertVehicleOptions(
    request:{ 
        ${addOptionIds ? `addOptionIds: ${addOptionIds}` : ''}
        ${highlightOptionIds ? `highlightOptionIds: ["${highlightOptionIds}"]` : ''},
        vehicleId: ${vehicleId}
    }) {
      id
      status
    }
  }
  
    `;
  //   console.log('updateVehicleSaleHoldStatus', mutation);
  return graphQLClientRequest(mutation);
}
