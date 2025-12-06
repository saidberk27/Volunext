import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Chatbot from './Chatbot';

const Layout = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
                <Sidebar />
                <main style={{ flex: 1, padding: '2rem', maxWidth: 'calc(100vw - 280px)', overflowX: 'hidden' }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ flex: 1 }}>
                            <Outlet />
                        </div>
                        <Footer />
                    </div>
                </main>
            </div>
            <Chatbot />
        </div>
    );
};

export default Layout;
