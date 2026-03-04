import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldAlert, Upload as UploadIcon, CheckCircle, Home as HomeIcon } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="glass sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary-400">
                    <ShieldAlert size={28} />
                    <span className="hidden sm:inline">CertiSafe</span>
                </Link>

                <div className="flex gap-4 sm:gap-8 font-medium">
                    <NavLink to="/" active={location.pathname === "/"} icon={<HomeIcon size={18} />}>Home</NavLink>
                    <NavLink to="/upload" active={location.pathname === "/upload"} icon={<UploadIcon size={18} />}>Upload</NavLink>
                    <NavLink to="/verify" active={location.pathname === "/verify"} icon={<CheckCircle size={18} />}>Verify</NavLink>
                </div>
            </div>
        </nav>
    );
};

const NavLink = ({ to, active, children, icon }) => (
    <Link to={to} className={`flex items-center gap-1 transition-colors ${active ? 'text-primary-400' : 'text-slate-400 hover:text-slate-100'}`}>
        {icon}
        <span className="hidden xs:inline">{children}</span>
    </Link>
);

export default Navbar;
