import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/reducers/root-reducer';

export const useAppDispatch: () => AppDispatch = useDispatch;