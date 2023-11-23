import React, { useState, useEffect } from 'react';

interface Device {
  id: number;
  name: string;
  model: string;
  status: string;
  connectionStats: string;  
}

const DevicesList: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('online'); 
  const [onlineDevicesCount, setOnlineDevicesCount] = useState<number>(0);
  const [offlineDevicesCount, setOfflineDevicesCount] = useState<number>(0);
  const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch(`http://localhost:5292/api/Devices`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setDevices(data);

        const onlineCount = data.filter((device: Device) => device.status === 'online').length;
        const offlineCount = data.filter((device: Device) => device.status === 'offline').length;
        setOnlineDevicesCount(onlineCount);
        setOfflineDevicesCount(offlineCount);

        const filtered = data.filter((device:Device) => device.status === filterStatus);
        setFilteredDevices(filtered);
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };

    fetchDevices();
  }, [filterStatus]);

  useEffect(() => {
    const filtered = devices.filter(device => device.status === filterStatus);
    setFilteredDevices(filtered);
  }, [devices, filterStatus]);

  const getStatusDotColor = (status: string): string => {
    return status === 'online' ? 'green' : 'red';
  };

  const [isButtonVisible, setButtonVisible] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <div className="bg-white ml-[80px] mr-[80px] mt-[-40px] rounded-sm">
      <div className="flex justify-between p-4 pb-0">
        <div className="flex ">

          <button onClick={() => setFilterStatus('online')} className={`py-2 px-4 rounded-lg border    border-gray-300 mr-[6px] mb-2 ${
            filterStatus === 'online'
            ? 'bg-blue-500 text-white'
            : 'bg-white text-black'
            }` }>
              Online 
            <span className={`px-2 rounded-lg border border-gray-300 ml-[8px] ${
              filterStatus === 'online'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-black'
              }`} >
              {onlineDevicesCount}
            </span>
          </button>

          <button onClick={() => setFilterStatus('offline')} className={`py-2 px-4 rounded-lg border border-gray-300 mr-[6px] mb-2 ${
            filterStatus === 'offline'
            ? 'bg-blue-500 text-white'
            : 'bg-white text-black'
            }`}>
              Offline  
            <span className={`px-2 rounded-lg border border-gray-300 ml-[8px] ${
              filterStatus === 'offline'
              ? 'bg-blue-100  text-blue-800'
              : 'bg-gray-100 text-black'
              }`} >
              {offlineDevicesCount}
            </span>
          </button>
        </div>
        
        <div className="items-center pt-4 px-4 rounded-lg bg-gray-100" style={{ width: '30%',   marginLeft: 'auto' }}>
          <i className="fa fa-search"></i><span className="ml-[8px]">Quick search..</span>
        </div>
      </div>

      <div className="p-4">
        {filteredDevices.map((device, index) => (
          <div
            key={device.id}
            className="rounded-lg p-2 border border-gray-300 mb-[6px]"
            onMouseEnter={() => {setButtonVisible(true); setHoveredRow(index);}}
            onMouseLeave={() => {setButtonVisible(false); setHoveredRow(null);}}
          >
            <div className="flex">
              <div className="flex-1 items-center font-bold">
                <span className="pl-2 pr-2" style={{ color: getStatusDotColor(device.status) }}>
                ●
                </span>{' '}
              {device.name}
              </div>
              <div className="flex-1 items-center text-sm">Model</div>
              <div className="flex-1 items-center text-sm">Con-Stat</div>
              <div className="" style={{ width: '12%', marginLeft: 'auto' }}>
                {isButtonVisible && index === hoveredRow && (
                  <div>
                    
                  </div>
                )}
              </div>
              <div className="" style={{ width: '12%', marginLeft: 'auto' }}>
                {isButtonVisible && index === hoveredRow && (
                  <div>
                    
                  </div>
                )}
              </div>
              <div className="" style={{ width: '5%', marginLeft: 'auto' }}>
                {isButtonVisible && index === hoveredRow && (
                  <div>
                    
                  </div>
                )}
              </div>
            </div>

            <div className="flex">
              <div className="flex-1 items-center">
                <span className="ml-[30px] text-sm"> Connection: 0%</span>
              </div>
              <div className="flex-1 items-center font-bold">{device.model}</div>
              <div className="flex-1 items-center font-bold">{device.connectionStats}</div>
              <div className="mt-[-10px]" style={{ width: '12%', marginLeft: 'auto' }}>
                {isButtonVisible && index === hoveredRow && (
                  <button className="bg-gray-200 rounded-lg p-1 px-4">
                    Settings
                  </button>
                )}
              </div>
              <div className="mt-[-10px]" style={{ width: '12%', marginLeft: 'auto' }}>
                {isButtonVisible && index === hoveredRow && (
                  <button className="bg-gray-200 rounded-lg p-1 px-4">
                    Control
                  </button>
                )}
              </div>
              <div className="mt-[-10px]" style={{ width: '5%', marginLeft: 'auto' }}>
                {isButtonVisible && index === hoveredRow && (
                  <button className="bg-gray-200 rounded-lg p-1 px-4">
                    &gt;
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gray-100 p-4">
          Showing 1 - {filteredDevices.length} of {filteredDevices.length} devices
      </div>
    </div>
  );
};

export default DevicesList;