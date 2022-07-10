import graphQLClientRequest, {ContextType} from '@api/graphQLClientRequest';

type RegisterVehicleType = {
  number: string;
  ownerName: string;
};

export default function registerVehicleApi({number, ownerName}: RegisterVehicleType, context?: ContextType): any {
  const mutation = `
    mutation{
        registerVehicle(registerVehicle:{
            number: "${number}"
            ownerName: "${ownerName}"
                } 
            ){
                createdDate 
                id
            }
        }
    `;

  // console.log('registerVehicleApi mutation', mutation);
  const response = graphQLClientRequest(mutation, context);
  return response;
}
