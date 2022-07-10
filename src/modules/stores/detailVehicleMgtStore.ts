import {makeAutoObservable} from 'mobx';

interface IDetailVehicleMgtStore {
  /* DetailVehicleManagement */
  id: number;
  status: string; // 판매상태
  manufacturer: string; // 제조사
  modelYear: string; // 연식
  modelDetail: string; // 브랜드
  modelTrim: string; // 트림
  vehicleId: number;
  retailPrice: any; // 출고가
  appearanceType: string; //  외형
  mileage: number; // 주행거리
  purchaseDate: string; // 매입일
  saleDate: string; // 매도일
  number: string; // 차량번호
  parkingLocation: string; // 주차위치
  vehicleFinanceList: any;
  /* CENTER */
  insuranceHistoryList: any;
  /* * 고정 값 * */
  ownerName: string; // 담당딜러
  vehicleIdentityNumber: string; // 차대번호
  transmissionType: string; // 변속기
  fuelTypeA: string;
  fuelTypeB: string; // 유종
  maximumPowerHp: string; // 최대 마력
  fuelConsumption: string; // 연비
  cc: number; // 배기량
  drivenWheels: string; // 구동방식

  setDetailVehicleMgt: (_status: string, _appearanceType: string, _mileage: number, _purchaseDate: string, _saleDate: string, _number: string, _parkingLocation: string) => void;

  setDetailVehicleMgtFixed: (
    _ownerName: string,
    _vehicleIdentityNumber: string,
    _transmissionType: string,
    _fuelTypeA: string,
    _fuelTypeB: string,
    _maximumPowerHp: string,
    _fuelConsumption: string,
    _cc: number
  ) => void;
  setId: (value: number) => void;
  setStatus: (value: string) => void;
  setAppearanceType: (value: string) => void;
  setModelTrim: (value: string) => void;
  setVehicleId: (value: number) => void;
  setMileage: (value: number) => void;
  setPurchaseDate: (value: string) => void;
  setSaleDate: (value: string) => void;
  setNumber: (value: string) => void;
  setParkingLocation: (value: string) => void;
  setVehicleFinanceList: (value: any) => void;

  setInsuranceHistoryList: (value: any) => void;

  /* DetailVehicleBottom */
  purchaseOffer: number; // 매입제시가
  purchase: number; // 매입비
  sale: number; // 희망판매가
  sheetMetal: number; // 판금비
  repair: number; // 수리비
  inspection: number; // 성능점검비
  consignment: number; // 탁송비
  advertisement: number; // 광고비
  etc: number; // 기타비
  loss: number; // 잡손실

  setPurchaseOffer: (value: number) => void;
  setPurchase: (value: number) => void;
  setSale: (value: number) => void;
  setSheetMetal: (value: number) => void;
  setRepair: (value: number) => void;
  setInspection: (value: number) => void;
  setConsignment: (value: number) => void;
  setAdvertisement: (value: number) => void;
  setEtc: (value: number) => void;
  setLoss: (value: number) => void;

  setDetailVehicleBottom: (
    _purchaseOffer: number,
    _purchase: number,
    _sale: number,
    _sheetMetal: number,
    _repair: number,
    _inspection: number,
    _consignment: number,
    _advertisement: number,
    _etc: number,
    _loss: number
  ) => void;

  setResult: (
    _id: number,
    _status: string,
    _number: string,
    _manufacturer: string,
    _modelYear: string,
    _modelDetail: string,
    _modelTrim: string,
    _appearanceType: string,
    _mileage: number,
    _purchaseOffer: number,
    _purchase: number,
    _sale: number,
    _purchaseDate: any,
    _saleDate: any,
    _ownerName: string,
    _vehicleIdentityNumber: string,
    _vehicleFinanceList: any
  ) => void;

  setVehicleInventory: (
    _sheetMetal: number,
    _repair: number,
    _inspection: number,
    _consignment: number,
    _advertisement: number,
    _etc: number,
    _loss: number,
    _parkingLocation: string
  ) => void;

  setJatoDetail: (
    _vehicleId: number,
    _retailPrice: any,
    _transmissionType: string,
    _fuelTypeA: string,
    _fuelTypeB: string,
    _maximumPowerHp: string,
    _fuelConsumption: string,
    _cc: number,
    _drivenWheels: string
  ) => void;
}

export default function createDetailVehicleMgtStore(): any {
  const store: IDetailVehicleMgtStore = makeAutoObservable({
    /* DetailVehicleManagement */
    id: 0,
    status: '',
    manufacturer: '',
    modelYear: '',
    modelDetail: '',
    modelTrim: '',
    vehicleId: 0,
    retailPrice: '',

    appearanceType: '',
    mileage: 0,
    purchaseDate: '',
    saleDate: '',
    number: '',
    parkingLocation: '',
    vehicleFinanceList: null,

    ownerName: '',
    vehicleIdentityNumber: '',
    transmissionType: '',
    fuelTypeA: '',
    fuelTypeB: '',
    maximumPowerHp: '',
    fuelConsumption: '',
    cc: 0,
    drivenWheels: '',

    insuranceHistoryList: [],

    /* DetailVehicleBottom */
    purchaseOffer: 0,
    purchase: 0,
    sale: 0,
    sheetMetal: 0,
    repair: 0,
    inspection: 0,
    consignment: 0,
    advertisement: 0,
    etc: 0,
    loss: 0,

    setDetailVehicleMgt(_status, _appearanceType, _mileage, _purchaseDate, _saleDate, _number, _parkingLocation) {
      this.status = _status;
      this.appearanceType = _appearanceType;
      this.mileage = _mileage;
      this.purchaseDate = _purchaseDate;
      this.saleDate = _saleDate;
      this.number = _number;
      this.parkingLocation = _parkingLocation;
    },

    setDetailVehicleMgtFixed(_ownerName, _vehicleIdentityNumber, _transmissionType, _fuelTypeA, _fuelTypeB, _maximumPowerHp, _fuelConsumption, _cc) {
      this.ownerName = _ownerName;
      this.vehicleIdentityNumber = _vehicleIdentityNumber;
      this.transmissionType = _transmissionType;
      this.fuelTypeA = _fuelTypeA;
      this.fuelTypeB = _fuelTypeB;
      this.maximumPowerHp = _maximumPowerHp;
      this.fuelConsumption = _fuelConsumption;
      this.cc = _cc;
    },
    setId(value) {
      this.id = value;
    },
    setStatus(value) {
      this.status = value;
      // // console.info('updated status! : ', this.status);
    },
    setAppearanceType(value) {
      this.appearanceType = value;
      // // console.info('updated! appearanceType: ', this.appearanceType);
    },
    setModelTrim(value) {
      this.modelTrim = value;
    },
    setVehicleId(value) {
      this.vehicleId = value;
    },
    setMileage(value) {
      this.mileage = value;
      // // console.info('updated mileage! : ', this.mileage);
    },
    setPurchaseDate(value) {
      this.purchaseDate = value;
      // // console.info('updated purchaseDate! : ', this.purchaseDate);
    },
    setSaleDate(value) {
      this.saleDate = value;
      // // console.info('updated saleDate! : ', this.saleDate);
    },
    setNumber(value) {
      this.number = value;
      // // console.info('updated carNumber! : ', this.carNumber);
    },
    setParkingLocation(value) {
      this.parkingLocation = value;
      // // console.info('updated parkingLocation! : ', this.parkingLocation);
    },
    setVehicleFinanceList(value) {
      this.vehicleFinanceList = value;
    },

    setInsuranceHistoryList(value) {
      this.insuranceHistoryList = value;
    },

    setDetailVehicleBottom(_purchaseOffer, _purchase, _sale, _sheetMetal, _repair, _inspection, _consignment, _advertisement, _etc, _loss) {
      this.purchaseOffer = _purchaseOffer;
      this.purchase = _purchase;
      this.sale = _sale;
      this.sheetMetal = _sheetMetal;
      this.repair = _repair;
      this.inspection = _inspection;
      this.consignment = _consignment;
      this.advertisement = _advertisement;
      this.etc = _etc;
      this.loss = _loss;
    },

    setPurchaseOffer(value): void {
      this.purchaseOffer = value;
      // console.info('updated purchaseOffer! : ', this.purchaseOffer);
    },
    setPurchase(value) {
      this.purchase = value;
      // console.info('updated purchase! : ', this.purchase);
    },
    setSale(value) {
      this.sale = value;
      // console.info('updated sale! : ', this.sale);
    },
    setSheetMetal(value) {
      this.sheetMetal = value;
      // console.info('updated sheetMetal! : ', this.sheetMetal);
    },
    setRepair(value) {
      this.repair = value;
      // console.info('updated repair! : ', this.repair);
    },
    setInspection(value) {
      this.inspection = value;
      // console.info('updated inspection! : ', this.inspection);
    },
    setConsignment(value) {
      this.consignment = value;
      // console.info('updated consignment! : ', this.consignment);
    },
    setAdvertisement(value) {
      this.advertisement = value;
      // console.info('updated advertisement! : ', this.advertisement);
    },
    setEtc(value) {
      this.etc = value;
      // console.info('updated etc! : ', this.etc);
    },
    setLoss(value) {
      this.loss = value;
      // console.info('updated loss! : ', this.loss);
    },
    setResult(
      _id,
      _status,
      _number,
      _manufacturer,
      _modelYear,
      _modelDetail,
      _modelTrim,
      _appearanceType,
      _mileage,
      _purchaseOffer,
      _purchase,
      _sale,
      _purchaseDate,
      _saleDate,
      _ownerName,
      _vehicleIdentityNumber,
      _vehicleFinanceList
    ) {
      this.id = _id;
      this.status = _status;
      this.number = _number;
      this.manufacturer = _manufacturer;
      this.modelYear = _modelYear;
      this.modelDetail = _modelDetail;
      this.modelTrim = _modelTrim;
      this.appearanceType = _appearanceType;
      this.mileage = _mileage;
      this.purchaseOffer = _purchaseOffer;
      this.purchase = _purchase;
      this.sale = _sale;
      this.purchaseDate = _purchaseDate;
      this.saleDate = _saleDate;
      this.ownerName = _ownerName;
      this.vehicleIdentityNumber = _vehicleIdentityNumber;
      this.vehicleFinanceList = _vehicleFinanceList;
    },
    setVehicleInventory(_sheetMetal = 0, _repair = 0, _inspection, _consignment, _advertisement, _etc, _loss, _parkingLocation) {
      // console.info(_sheetMetal, _repair, _inspection, _consignment, _advertisement, _etc, _loss);
      this.sheetMetal = _sheetMetal;
      this.repair = _repair;
      this.inspection = _inspection;
      this.consignment = _consignment;
      this.advertisement = _advertisement;
      this.etc = _etc;
      this.loss = _loss;
      this.parkingLocation = _parkingLocation;
    },
    setJatoDetail(_vehicleId, _retailPrice, _transmissionType, _fuelTypeA, _fuelTypeB, _maximumPowerHp, _fuelConsumption, _cc, _drivenWheels) {
      const temp = String(_retailPrice);
      this.vehicleId = _vehicleId;
      this.retailPrice = temp.substring(0, temp.length - 4);
      this.transmissionType = _transmissionType;
      this.fuelTypeA = _fuelTypeA;
      this.fuelTypeB = _fuelTypeB;
      this.maximumPowerHp = _maximumPowerHp;
      this.fuelConsumption = _fuelConsumption;
      this.cc = _cc;
      this.drivenWheels = _drivenWheels;
    }
  });
  return store;
}
