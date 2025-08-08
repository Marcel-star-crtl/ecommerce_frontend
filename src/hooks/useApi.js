import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from '../features/utils/loadersSlice';
import api from '../api/api';

const useApi = () => {
  const dispatch = useDispatch();

  const sendRequest = async (request) => {
    dispatch(showLoader());
    try {
      const response = await request;
      dispatch(hideLoader());
      return response;
    } catch (error) {
      dispatch(hideLoader());
      throw error;
    }
  };

  return { sendRequest };
};

export default useApi;