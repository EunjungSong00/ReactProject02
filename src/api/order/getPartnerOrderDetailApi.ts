import graphQLClientRequest from '@api/graphQLClientRequest';

export default function getPartnerOrderDetailApi(id: number, context?: any): any {
  const query = `
        query {
            getPartnerOrderDetail(id:${id}){
                order {
                 id                    # 주문 ID
                 orderDate             # 주문날짜
                 orderNumber           # 주문번호
                 orderStatus           # 주문 상태
                 zipcode               # 탁송지 우편번호 
                 address               # 탁송지 주소
                 detailAddress         # 탁송지 상세주소
                 memo                  # 메모 
                 recipientName         # 수령인 이름 
                 phoneNumber           # 수령인 연락처
                 usedAmount            # 이용료 금액
                 settlementStatus      # 정산 상태
               }
               customer {
                 name                  # 주문자 이름 
                 loginId               # 주문자 아이디 
               }
               partner {
                 name                  # 판매딜러
               }
               consignment {
                 driverName                # 탁송기사 이름 
                 driverPhoneNumber         # 탁송기사 연락처
                 consignmentName           # 탁송회사 이름 
                 consignmentPhoneNumber    # 탁송회사 연락처 
                 consignmentZipcode        # 탁송회사 우편번호 
                 consignmentAddress        # 탁송회사 주소 
                 consignmentDetailAddress  # 탁송회사 상세주소 
               }
               vehicle {
                imageList {
                  name
                  type
                  createdDate
                }
                 number            # 차량 번호 
                 manufacturer      # 브랜드(제조사)
                 modelYear         # 연형
                 modelName         # 모델명
                 modelDetail       # 상세모델명
                 modelTrim         # 모델 트림 
                 createdDate       # 등록일
                 mileage           # 주행거리
                 salePrice         # 차량금액
               }
             
             }
          }
    `;

  // console.log('getPartnerOrderListApi', query);
  const response = graphQLClientRequest(query, context);
  // console.log('response', response);
  return response;
}
