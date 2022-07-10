import {makeAutoObservable} from 'mobx';

interface IEasyVehicleSearch {
  carNo: string;
  setCarNo: (carNo: string) => void;
}

export default function createEasyVehicleSearchStore(): object {
  const store: IEasyVehicleSearch = makeAutoObservable({
    carNo: '',
    setCarNo(carNo) {
      this.carNo = carNo;
      // console.info('updated! : ', this.carNo);
    }
  });
  return store;
}
