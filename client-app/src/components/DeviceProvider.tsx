import React, { useState, ReactNode } from 'react';
import { DeviceContext } from './DeviceContext';
import { Device } from './Device';

type DeviceProviderProps = {
    children: ReactNode;
};

const DeviceProvider: React.FC<DeviceProviderProps> = ({ children }) => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [filterStatus, setFilterStatus] = useState<string>('online');
    const [onlineDevicesCount, setOnlineDevicesCount] = useState<number>(0);
    const [offlineDevicesCount, setOfflineDevicesCount] = useState<number>(0);
    const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
    const [isButtonVisible, setButtonVisible] = useState(false);
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);

    return (
        <DeviceContext.Provider value={{
            devices, 
            setDevices,
            filterStatus,
            setFilterStatus,
            onlineDevicesCount,
            setOnlineDevicesCount,
            offlineDevicesCount,
            setOfflineDevicesCount,
            filteredDevices,
            setFilteredDevices,
            isButtonVisible,
            setButtonVisible,
            hoveredRow,
            setHoveredRow
        }}>
        {children}
        </DeviceContext.Provider>
    );
};

export default DeviceProvider;