import {makeAutoObservable} from 'mobx';

interface IAuthStore {
  id: string;
  email: string;
  password: string;
  passwordCheck: string;
  setId: (_id: string) => void;
  setEmail: (_email: string) => void;
  setPassword: (_password: string) => void;
  setPasswordCheck: (_passwordCheck: string) => void;
}

export default function createAuthStore(): object {
  const store: IAuthStore = makeAutoObservable({
    id: '',
    email: '',
    password: '',
    passwordCheck: '',
    setId(_id) {
      this.id = _id;
      // console.info('updated! : ', this.id);
    },
    setEmail(_email) {
      this.email = _email;
      // console.info('updated! : ', this.email);
    },
    setPassword(_password) {
      this.password = _password;
      // console.info('updated! : ', this.password);
    },
    setPasswordCheck(_passwordCheck) {
      this.passwordCheck = _passwordCheck;
      // console.info('updated! : ', this.passwordCheck);
    }
  });
  return store;
}
