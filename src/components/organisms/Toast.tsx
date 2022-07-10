import styled from '@emotion/styled';
import 'react-toastify/dist/ReactToastify.css';
import {toast as toastify, ToastContainer} from 'react-toastify';
import {useEffect, Dispatch, SetStateAction, ReactElement} from 'react';
import {Wrapper} from '@components/atoms';
import theme from '@public/theme';

interface IToast extends IStyleToast {
  toast: any;
  setToast: Dispatch<SetStateAction<any>>;
  position?: 'top-center' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left' | 'center-center';
  onClose?: () => void;
  delay?: number;
  hideProgressBar?: boolean;
}

interface IStyleToast {
  type?: 'success' | 'warn' | 'error';
  centerCenter?: boolean;
}

export default function Toast({toast, setToast, onClose = () => null, type = 'success', position = 'top-center', delay = 1500}: IToast): ReactElement {
  useEffect(() => {
    const _onClose = () => {
      setToast(undefined);
      onClose();
    };
    const options = {
      position: position === 'center-center' ? 'top-center' : position,
      onClose: () => _onClose()
    };

    toast && type === 'success'
      ? toastify.info(toast, options)
      : toast && type === 'error'
      ? toastify.error(toast, options)
      : toast && type === 'warn'
      ? toastify.warn(toast, options)
      : toast && console.error('carmerce - toastify exception');
  }, [toast]);

  return toast ? (
    <_Toast w h width="100%" centerCenter={position === 'center-center'}>
      <ToastContainer className="toast" autoClose={delay} theme="light" newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </_Toast>
  ) : (
    <></>
  );
}

// eslint-disable-next-line no-underscore-dangle
const _Toast = styled(Wrapper)<IStyleToast>`
  .toast.Toastify__toast-container.Toastify__toast-container--top-center {
    width: 350px;
    height: 100px;
    ${({centerCenter}) => centerCenter && 'top: 40%;'}
  }
  .Toastify__toast.Toastify__toast-theme--light {
    height: 100%;
    width: 100%;
  }
  .Toastify__toast--success {
    ${({type}) => type === 'success' && `background: ${theme.color.main};`}
    div {
      color: white;
    }
  }
  .Toastify__toast-body {
    display: flex;
    div {
      line-height: 18px;
      font-family: ${theme.font[4]};
      font-size: 15px;
    }
  }
  .Toastify__toast-icon.Toastify--animate-icon.Toastify__zoom-enter {
    width: 16px;
    height: 16px;
  }
  /* .Toastify__toast-icon.Toastify--animate-icon.Toastify__zoom-enter {
    width: 30px;
    height: 30px;
    background: url('/images/carmerce_icon.svg') center/70% no-repeat;
    svg {
      display: none;
    }
  } */
`;
