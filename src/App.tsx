import React from 'react';
import InnerList from './components/inner-list'
import { DataProvider } from './contexts/data-context';

const App = () => <DataProvider><InnerList parentId={-1} /></DataProvider>

export default App;
