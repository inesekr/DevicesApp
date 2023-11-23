import {FC} from 'react';
import  {BrowserRouter, Routes, Route, Link}  from 'react-router-dom';
import './index.css';
import DevicesList from './components/DevicesList';
import Dashboard from './components/Dashboard';
import Connectors from './components/Connectors';
import Settings from './components/Settings';
import Header from './components/Header'; 
import Logo from './logo.jpg';

const App: FC = () => {
  return (
    <BrowserRouter>
      <div >
        <nav style={{ backgroundColor: '#181E34' }} className="p-4 pl-[80px] text-white">
          <div className="flex items-center">
            <div>
              <img src={Logo} alt="Logo" className="w-16 h-12 mr-4 rounded-md" />
            </div>
            <ul className="flex">        
              <li className="mr-6">
                <Link to="/" className="text-white hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li className="mr-6">
                <Link to="/Dashboard" className="text-sm text-white hover:text-gray-300">
                  Dashboard
                </Link>
              </li>
              <li className="mr-6">
                <Link to="/Connectors" className="text-sm text-white hover:text-gray-300">
                  Connectors
                </Link>
              </li>
              <li className="mr-6">
                <Link to="/Devices" className="text-sm text-white hover:text-gray-300">
                  Devices
                </Link>
              </li>
              <li className="mr-6">
                <Link to="/Settings" className="text-sm text-white hover:text-gray-300">
                  General Settings
                </Link>
              </li>
            </ul>
            <div className="ml-auto mr-[80px]">
              <span className="w-8 h-8 rounded-full pl-[8px] pr-[8px] bg-gray-100 text-blue-700">R</span>
              <span className="pr-[2px] pl-[20px]">Roberts</span>
              <span className="pl-[8px] text-xs">&#8744;</span>
            </div>
          </div>  
        </nav>

        <Header />

        <Routes>
          <Route path="/" element={<DevicesList />} />
          <Route path="/Dashboard" element={<Dashboard/>} />
          <Route path="/Connectors" element={<Connectors/>} />
          <Route path="/Devices" element={<DevicesList />} />
          <Route path="/Settings" element={<Settings/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;