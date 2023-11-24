import React, { useEffect, useContext } from 'react';
import { DeviceContext } from './DeviceContext';
import { Device } from './Device';

const FilteredDevices: React.FC = () => {
    const context = useContext(DeviceContext);
   
    if (!context) {
      throw new Error('FilteredDevices must be used within a DeviceContext.Provider');
    }
   
    const { devices, setDevices, filterStatus, setFilterStatus, onlineDevicesCount, setOnlineDevicesCount, offlineDevicesCount, setOfflineDevicesCount, filteredDevices, setFilteredDevices, isButtonVisible, setButtonVisible, hoveredRow, setHoveredRow } = context;

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
            }   
            catch (error) {
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

    return (
        <>
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
        </>
    );
};

export default FilteredDevices;