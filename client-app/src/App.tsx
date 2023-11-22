import React from 'react';
import {FC} from 'react';
import './index.css'; 
import DevicesList from './components/DevicesList';

const App: FC = () => {
  return (
    <div >
      <h1  className="text-3xl font-bold text-yellow-800 underline p-5">Devices App</h1>
      <DevicesList />
    </div>
  );
}

export default App;
