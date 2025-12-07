import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Chatbot from './Chatbot';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

    const location = useLocation();
    const isMapPage = location.pathname === '/app/map';

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 768);
            if (window.innerWidth > 768) {
                setIsSidebarOpen(false); // Reset sidebar state on desktop
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Show Hamburger only on Mobile */}
            <Navbar onMenuClick={() => setIsSidebarOpen(true)} isDesktop={isDesktop} />
            <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
                {/* Sidebar: Fixed on Desktop, Drawer on Mobile */}
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    isDesktop={isDesktop}
                />
                <main style={{
                    flex: 1,
                    padding: isMapPage ? '0' : (isDesktop ? '2rem' : '1rem'),
                    maxWidth: '100%',
                    overflowX: 'hidden'
                }}>
                    <div style={{
                        maxWidth: isMapPage ? '100%' : '1000px',
                        margin: '0 auto',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div style={{ flex: 1 }}>
                            <Outlet />
                        </div>
                        {!isMapPage && <Footer />}
                    </div>
                </main>
            </div>
            <Chatbot />
        </div>
    );
};

export default Layout;
