import { FC } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Header: FC = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const currentPageName = pathnames.length > 0 
        ? pathnames[pathnames.length - 1] === 'Devices'
        ? 'Devices'
        : pathnames[pathnames.length - 1]
        : 'Home';

    return (
        <div style={{ backgroundColor: '#181E34' }} className="pb-[60px] pl-[80px]">
            {pathnames.length > 0 && (
                <div className="text-sm text-gray-500">
                    <Link to="/" className="text-sm text-white hover:underline hover:text-gray-300">
                        Home
                    </Link>
                </div>
            )}
            <h2 className="text-xl text-white">
                {currentPageName}
            </h2>
        </div>
    );
};

export default Header;