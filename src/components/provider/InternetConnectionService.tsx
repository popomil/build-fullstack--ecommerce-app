import { useToast } from '@chakra-ui/react';
import { ReactNode, useEffect, useRef } from 'react';
import { BsWifiOff } from 'react-icons/bs';
import { networkMode } from '../../app/feature/network/nteworkSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks/hooks';

interface IProps {
  children: ReactNode;
}

const InternetConnectionProvider = ({ children }: IProps) => {
  const {isOnline} =useAppSelector(state => state.network)
  const toast = useToast();
  const dispatch =useDispatch()
  const toastIdRef = useRef<string | number>();
  const addToast = () => {
    if (isOnline) {
      toastIdRef.current = toast({
        title: "You're Offline",
        description: "Please make sure you have internet connection",
        status: "warning",
        isClosable: true,
        icon: <BsWifiOff size={20} />,
        duration: null
      });
    }
  };

  const closeToast = () => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
      toastIdRef.current = undefined;
    }
  };

  useEffect(() => {
    const handleOnline = () => {
      dispatch(networkMode(navigator.onLine));
      closeToast();
    };

    const handleOffline = () => {
      dispatch(networkMode(navigator.onLine));
      addToast();
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      closeToast();
    };
  }, [toast]);

  return <>{children}</>;
};

export default InternetConnectionProvider;