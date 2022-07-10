import graphQLClientRequest, {PageRequestType} from '@api/graphQLClientRequest';

export type VehicleListType = PageRequestType & {
  keyword?: string;
  sort?: string;
  direction?: string;
  start?: string;
  end?: string;
  isMyVehicle?: string;
};

export default function getVehicleStatusListApi({keyword, pageNo, pageSize, sort, direction, start, end, isMyVehicle}: VehicleListType, context?: any): any {
  const query = `
        query {
          getVehicleStatusList(request: {
                pageNo: ${Number(pageNo) ? Number(pageNo) - 1 : 0}
                pageSize: ${pageSize || 10}
                keyword: "${keyword || ''}"
                sort: ${sort || 'CREATE_DATE'}
                direction: ${direction || 'DESC'}
                ${start && end ? `saleDateStart: "${start}"` : ''}
                ${start && end ? `saleDateEnd: "${end}"` : ''}
                isMyVehicle: ${isMyVehicle === 'true'}
              }) {
                columns
                status {
                  count
                  status
                }
                list {
                  total totalPages pageNo pageSize
                  results {
                    id            # 차량ID 
                    number        # 차량번호
                    manufacturer  # 브랜드
                    modelYear     # 연형
                    modelName     # 모델명
                    createdDate   # 등록일
                    partner       # 담당딜러
                    modelTrim     # 트림명
                    parkingLocation # 주차위치
                    mileage       # 주행거리
                    salePrice     # 판매가
                    appearanceType  # 외형
                    status        # 상태
                    jatoVehicleId # 맵핑ID
                  }
                }
              }
          }
    `;

  // console.log('getVehicleStatusListApi', query);
  const response = graphQLClientRequest(query, context);
  return response;
}
