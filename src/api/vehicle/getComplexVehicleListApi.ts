import graphQLClientRequest, {PageRequestType} from '@api/graphQLClientRequest';

export type ComplexVehicleListType = PageRequestType & {
  modelName: string;
  sort: string;
  sortDirection: string;
};

export default function getComplexVehicleList({pageNo, pageSize, modelName, sort, sortDirection}: ComplexVehicleListType, context?: any): any {
  const query = `
    query {
      getComplexVehicleList(request: {
        pageNo: ${pageNo}
        pageSize: ${pageSize}
        modelName: "${modelName}"
        sort: ${sort}
        sortDirection: ${sortDirection}
    }) {
        vehicleId
        modelName
        mileage
        salePrice
        number
        modelTrim
        modelYear
        manufacturer
        fuel
        displacement
        dealerId
        dealerName
        companyName
      }
    }
  `;

  // console.log('getComplexVehicleList query', query);
  const response = graphQLClientRequest(query, context);
  return response;
}
