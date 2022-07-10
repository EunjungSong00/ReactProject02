import graphQLClientRequest, {ApiOptionsType} from '@api/graphQLClientRequest';

enum VehicleStatisticsDateType {
  MONTH_1,
  MONTH_3,
  MONTH_6,
  YEAR
}
export default function getVehicleDashBoardInventoryApi(options?: ApiOptionsType): any {
  const query = `
    query{
      getVehicleDashBoardInventory: getVehicleDashBoard(
          searchType: ${VehicleStatisticsDateType[0]}
      ) {
          status {
              count
              status
          }
          size {
            averageDay
            totalCount
            totalAmount
          }
       }
    }
  `;

  if (options?.getGql) return query;

  console.info('getVehicleDashBoardInventoryApi query', query);
  const response = graphQLClientRequest(query, options?.context);
  return response;
}
