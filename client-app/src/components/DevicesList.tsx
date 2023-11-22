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

  return (
    <div>
      <h2>Devices List</h2>
      <div>
        <button onClick={() => setFilterStatus('online')}>
          Online ({onlineDevicesCount})
        </button>
        <button onClick={() => setFilterStatus('offline')}>
          Offline ({offlineDevicesCount})
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Status indicator</th>
            <th>Name</th>
            <th>Model</th>
            <th>Status</th>
            <th>Connection stats</th>
          </tr>
        </thead>
        <tbody>
          {filteredDevices.map(device => (
            <tr key={device.id}>
              <td>
              <span style={{ color: getStatusDotColor(device.status) }}>●</span> {device.name}
              </td>
              <td>{device.name}</td>
              <td>{device.model}</td>
              <td>{device.status}</td>
              <td>{device.connectionStats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DevicesList;
