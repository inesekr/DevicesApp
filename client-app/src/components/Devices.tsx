import React from 'react';
import FilteredDevices from './FilteredDevices';
import FilterButtons from './FilterButtons';

const Devices: React.FC = () => {

    return (
        <div className="bg-white ml-[80px] mr-[80px] mt-[-40px] rounded-sm">
            <FilterButtons />
            <FilteredDevices />
        </div>
    );
};

export default Devices;