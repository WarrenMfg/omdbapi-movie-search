import { createContext } from 'react';
import { RootState } from './types';

const Store = createContext<RootState>({} as RootState);

export default Store;
