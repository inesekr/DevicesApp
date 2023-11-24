    import React, { useContext } from 'react';
    import { DeviceContext } from './DeviceContext';

    const FilterButtons: React.FC = () => {
        const context = useContext(DeviceContext);
       
        if (!context) {
          throw new Error('FilterButtons must be used within a DeviceContext.Provider');
        }
       
        const { filterStatus, setFilterStatus, onlineDevicesCount, offlineDevicesCount } = context;
    
        return (
            <div className="flex ">
                <button onClick={() => setFilterStatus('online')} className={`py-2 px-4 rounded-lg border           border-gray-300 mr-[6px] mb-2 ${
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
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-black'
                        }`} >
                            {offlineDevicesCount}
                        </span>
                </button>
            </div>
        );
    }; 

export default FilterButtons;