import {FC} from 'react';
import  {BrowserRouter, Routes, Route, Link}  from 'react-router-dom';
import './index.css';
import Devices from './components/Devices';
import Dashboard from './components/Dashboard';
import Connectors from './components/Connectors';
import Settings from './components/Settings';
import Header from './components/Header'; 
import DeviceProvider from './components/DeviceProvider';
import Navigation from './components/Navigation';

const App: FC = () => {
  return (
    <DeviceProvider>
      <BrowserRouter>
        <div >
          <Navigation />
          <Header />
          <Routes>
            <Route path="/" element={<Devices />} />
            <Route path="/Dashboard" element={<Dashboard/>} />
            <Route path="/Connectors" element={<Connectors/>} />
            <Route path="/Devices" element={<Devices />} />
            <Route path="/Settings" element={<Settings/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </DeviceProvider>
  );
}

export default App;