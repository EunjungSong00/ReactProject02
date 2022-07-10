import {makeAutoObservable} from 'mobx';

interface INiceStore {
  encodeData: string;
  setEncodeData: (_encodeData: string) => void;
}

export default function createNiceStore(): any {
  const store: INiceStore = makeAutoObservable({
    encodeData: '',
    setEncodeData(_encodeData) {
      this.encodeData = _encodeData;
      // console.info('updated! : ', this.id);
    }
  });
  return store;
}
