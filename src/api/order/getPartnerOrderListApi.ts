import graphQLClientRequest, {PageRequestType} from '@api/graphQLClientRequest';

export type PartnerOrderListType = PageRequestType & {
  keyword?: string;
  startDate?: string;
  endDate?: string;
  sort?: string;
  direction?: string;
};

export default function getPartnerOrderListApi({keyword, pageNo = 0, pageSize = 10, startDate, endDate, sort, direction}: PartnerOrderListType, context?: any): any {
  const query = `
        query {
            getPartnerOrderList(
              request: {
                pageNo: ${pageNo} #Int!
                pageSize: ${pageSize} #Int!
                ${keyword ? `keyword: "${keyword}"` : ''} #String
                ${startDate && endDate ? `startDate: "${startDate}"` : ''} #String
                ${startDate && endDate ? `endDate: "${endDate}"` : ''} #String
            }) {
              data {
                pageNo
                pageSize
                totalPages
                total                   # 전체
                results {
                  id                    # 번호
                  orderDate             # 주문일
                  orderNumber           # 주문번호
                  vehicleNumber         # 차량번호
                  manufacturer          # 브랜드
                  modelYear             # 연형 
                  modelName             # 모델명
                  modelTrim             # 트림명
                  salePrice             # 판매가
                  orderStatus           # 주문상태
                  settlementStatus         # 정산상태
                  consignmentStatus     # 탁송상세
                  imageList {           # 이미지
                    name
                    type
                  }
                }
              }
              status {
                status     # 상태 (주문접수, 탁송중, 탁송완료, 구매확정, 주문완료, 변심/취소 환불요청, 불량/취소 환불요청, 반납중, 반납완료, 환불/취소완료)
                count      # 상태 건수
              }
            }
          }
    `;

  // console.log('getPartnerOrderListApi', query);
  const response = graphQLClientRequest(query, context);
  // console.log('response', response);
  return response;
}
