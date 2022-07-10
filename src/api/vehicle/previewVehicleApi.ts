import graphQLClientRequest from '@api/graphQLClientRequest';
import {formattedDate} from '@modules/replaceStrings';
import {toJS} from 'mobx';

export default async function previewVehicleApi(data: any) {
  const list = toJS(data.vehicleFinanceList);
  const items = list.map((item: any) => ({...item, loan: Number(item.loan || 0), interestRate: parseFloat(item.interestRate), date: `${formattedDate(item.date)} 00:00:00`}));
  const temp = JSON.stringify(items);
  const unquoted = temp.replace(/"([^"]+)":/g, '$1:');
  console.log('data', data);
  const mutation = `
    mutation{
        previewVehicle(id:${data.id}, request: {
            inventory: {
                consignment: ${Number(data.consignment || 0)},
                etc: ${Number(data.etc || 0)},
                inspection: ${Number(data.inspection || 0)},
                parkingLocation: "${data.parkingLocation}",
                sheetMetal: ${Number(data.sheetMetal || 0)}
            },
            finance:${unquoted.replaceAll('"FINANCE"', 'FINANCE').replaceAll('"COMPANY"', 'COMPANY')},
            jatoVehicleId: "${data.jatoVehicleId}",
            mileage:${data.mileage || 0},
            purchase:${Number(data.purchase || 0)},
            transferCost:${Number(data.transferCost || 0)},
            purchaseDate:"${data.purchaseDate ? formattedDate(new Date(data.purchaseDate)) : formattedDate(new Date())} 00:00:00",
            salePrice:${Number(data.salePrice || 0)},
            saleDate:"${data.saleDate ? formattedDate(new Date(data.saleDate)) : formattedDate(new Date())} 00:00:00",
            pickupZipCode:"${data.pickupZipCode}"
            pickupAddress:"${data.pickupAddress}"
            pickupAddressDetail:"${data.pickupAddressDetail}"
            pickupLatitude:${data.pickupLatitude || 0}
            pickupLongitude:${data.pickupLongitude || 0}
            ${data.dealerId && `dealerId: ${data.dealerId}`}
          }){
                status
                salePrice
                pickupZipCode
                pickupAddress
                pickupAddressDetail
                pickupLatitude
                pickupLongitude
            }
        }
    `;
  console.log('mutation', mutation);
  return graphQLClientRequest(mutation);
}
