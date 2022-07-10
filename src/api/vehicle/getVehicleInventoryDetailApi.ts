import graphQLClientRequest, {ApiOptionsType} from '@api/graphQLClientRequest';

export default function getVehicleInventoryDetailApi(id: any, options?: ApiOptionsType): any {
  const query = `
        query {
          getVehicleInventoryDetail(
                id: ${id}
              ) {
                id
                jatoVehicleId
                registeredLedgerMileage
                manufacturer
                modelYear
                modelDetail
                modelName
                modelTrim
                ownerName
                vehicleIdentityNumber
                status
                appearanceType
                mileage
                purchaseDate
                saleDate
                createdDate
                parkingLocation
                number
                salePrice
                pickupZipCode
                pickupAddress
                pickupAddressDetail
                pickupLatitude
                pickupLongitude
                partner {
                  name
                  id
                  loginId
                }
                  color
                
                  insuranceHistory {
                  # 1. 중고차 사고이력 정보(요약)
                  generalTotalLossAccidentCount
                  theftTotalLossAccidentCount
                  floodedAccidentCount
                  rentalCommercialHistory
                  generalCommercialHistory
                  selfAccidentCount
                  selfAccidentInsuranceMoney
                  otherAccidentCount
                  otherAccidentInsuranceMoney
                  ownerChangeCount
                  vehicleInformationChangeCount
                  # 2. 자동차 일반 사양 정보
                  manufacturerName
                  name
                  modelYear
                  name
                  bodyStyle
                  displacement
                  useType
                  modelType
                  fuel
                  initialInsuranceSubscriptionDate
                  # 3. 자동차 특수 용도 이력 정보
                  rentalCommercialHistory
                  generalCommercialHistory
                  officialHistory
                  # 4. 자동차 번호/소유자 변경이력 정보
                  ownerChangeList {
                    date
                    type
                    modelType
                    useType
                  }
                  vehicleInformationChangeList {
                    date
                    id
                    number
                    type
                    modelType
                    useType
                  }
                  # 5. 자동차 특수 사고 이력 정보
                  generalTotalLossAccidentCount
                  theftTotalLossAccidentCount
                  floodedAccidentCount
                  # 6. 보험사고이력 상세 정보
                  unsubscribedDate
                }

                vehicleFinanceList {
                  type
                  company
                  date
                  interestRate
                  loan
                }
                transmission					# 변속기
                fuel							# 연료
                fuelConsumption					# 연비
                factoryPrice					# 출고가
                engineDisplacement				# 배기량 
                maxPower						# 최대 마력
                wheelDrive						# 구동
                seat							# 승차정원


           

                basicOption {
                  exterior {
                    exist
                    optionName
                  }
                  interior {
                    exist
                    optionName
                  }
                  safety {
                    exist
                    optionName
                  }
                  utilityMultimedia {
                    exist
                    optionName
                  }
                }
                vehicleInventory {
                  purchase
                  transferCost
                  sheetMetal
                  inspection
                  consignment
                  etc
                }
                imageList {
                  name
                  type
                }
              }
              getVehicleInspectionRecord (id:${id}) {
                inspectionRecordImageList{
                  originFilename
                  name
                }
              }
        }
    `;
  if (options?.getGql) return query;
  const response = graphQLClientRequest(query, options?.context);
  console.log(response);
  return response;
}
