import graphQLClientRequest from '@api/graphQLClientRequest';

export default function deleteVehicleApi(id : number) {
  const mutation = `
    mutation{
      deleteVehicle(id:${id}, delete: {type:ETC}){
                id
                status
            }
        }
    `;
    // console.log('mutation', mutation);
    return graphQLClientRequest(mutation);
}
