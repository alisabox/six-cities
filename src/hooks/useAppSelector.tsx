import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../store/reducers/root-reducer';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;