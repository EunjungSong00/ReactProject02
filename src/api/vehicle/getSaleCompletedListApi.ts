import graphQLClientRequest, {PageRequestType} from '@api/graphQLClientRequest';

export type SalesCompletionHistoryType = PageRequestType & {
  keyword?: string;
  sort?: string;
  direction?: string;
  start?: string;
  end?: string;
};

export default function getSaleCompletedListApi({keyword, pageNo, pageSize, sort, direction, start, end}: SalesCompletionHistoryType, context?: any): any {
  const query = `
        query {
          getSaleCompletedList(
              request:{ 
                pageNo: ${Number(pageNo) ? Number(pageNo) - 1 : 0}
                pageSize: ${pageSize || 10}
                keyword: "${keyword || ''}"
                sort: ${sort || 'PURCHASE_DATE'}
                direction: ${direction || 'ASC'}
                ${start && end ? `saleDateStart: "${start}"` : ''}
                ${start && end ? `saleDateEnd: "${end}"` : ''}
          }) {
            status {
              count
              status
            }
            data {
              totalPages
              results {
                id                # 클릭 시 페이지 이동 이벤트 관련
                jatoVehicleId     # 클릭 시 페이지 이동 이벤트 관련

                number            # 차량번호(필수)
                manufacturer      # 브랜드(필수)
                modelYear         # 연형(필수)
                modelName         # 모델명(필수)
                modelTrim         # 트림명
                purchaseDate      # 매입일
                saleDate          # 매도일
                salePrice         # 판매가
                totalLossCost     # 총비용
                getProfitAndLoss  # 손익
                status            # 차량상태(판매처)
              }
            }
          }
        }
    `;

  // console.log('getSaleCompletedListApi query', query);
  const response = graphQLClientRequest(query, context);
  return response;
}
