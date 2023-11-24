import React from 'react';
import { Device } from './Device';

interface DeviceContextProps {
  devices: Device[];
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  filterStatus: string;
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>;
  onlineDevicesCount: number;
  setOnlineDevicesCount: React.Dispatch<React.SetStateAction<number>>;
  offlineDevicesCount: number;
  setOfflineDevicesCount: React.Dispatch<React.SetStateAction<number>>;
  filteredDevices: Device[];
  setFilteredDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  isButtonVisible: boolean;
  setButtonVisible: React.Dispatch<React.SetStateAction<boolean>>;
  hoveredRow: number | null;
  setHoveredRow: React.Dispatch<React.SetStateAction<number | null>>;
}

export const DeviceContext = React.createContext<DeviceContextProps | undefined>(undefined);