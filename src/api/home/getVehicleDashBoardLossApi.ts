import graphQLClientRequest, {ApiOptionsType} from '@api/graphQLClientRequest';

enum VehicleStatisticsDateType {
  MONTH_3,
  MONTH_1,
  MONTH_6,
  YEAR
}
export default function getVehicleDashBoardLossApi(term: number, options?: ApiOptionsType): any {
  const query = `
    query{
      getVehicleDashBoardLoss: getVehicleDashBoard(
          searchType: ${VehicleStatisticsDateType[term]}
      ) {
            lossStatistics {
            cost
            date
            }
       }
    }
  `;

  if (options?.getGql) return query;

  // console.log('getVehicleDashBoardLossApi query', query);
  const response = graphQLClientRequest(query, options?.context);
  return response;
}
