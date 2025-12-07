import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Map as MapIcon, User, Trophy, Cpu, X } from 'lucide-react';

const getLinkStyle = (name) => ({ isActive }) => {
    return ({
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem 1.5rem',
        marginBottom: '0.5rem',
        borderRadius: '1rem',
        color: isActive ? 'white' : 'hsl(var(--text-muted))',
        background: isActive ? 'linear-gradient(90deg, hsl(var(--primary) / 0.2), transparent)' : 'transparent',
        borderLeft: isActive ? '3px solid hsl(var(--primary))' : '3px solid transparent',
        transition: 'all 0.2s',
        textDecoration: 'none',
        fontWeight: isActive ? '600' : '400'
    });
};

const Sidebar = ({ isOpen, onClose, isDesktop }) => {
    // Determine class based on desktop/mobile state
    // On Desktop: Static (no 'sidebar-drawer' class which hides it)
    // On Mobile: 'sidebar-drawer' class + 'open' based on state
    const sidebarClass = isDesktop ? '' : `sidebar-drawer ${isOpen ? 'open' : ''}`;

    return (
        <>
            {/* Mobile Overlay */}
            {!isDesktop && (
                <div
                    className={`sidebar-overlay ${isOpen ? 'open' : ''} mobile-only`}
                    onClick={onClose}
                />
            )}

            <aside
                className={sidebarClass}
                style={{
                    width: '280px',
                    borderRight: isDesktop ? '1px solid hsl(var(--border))' : 'none',
                    backgroundColor: 'hsl(var(--bg-dark))',
                    padding: '2rem 1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    height: isDesktop ? 'calc(100vh - 70px)' : '100vh',
                    position: isDesktop ? 'sticky' : 'fixed',
                    top: isDesktop ? '70px' : '0',
                    left: 0,
                    zIndex: 90,
                    overflowY: 'auto'
                }}
            >
                {/* Mobile Close Button */}
                {!isDesktop && (
                    <div className="mobile-only" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                        <button onClick={onClose} style={{ color: 'hsl(var(--text-muted))' }}>
                            <X size={24} />
                        </button>
                    </div>
                )}

                <NavLink to="/app/home" style={getLinkStyle('Ana Sayfa')} onClick={!isDesktop ? onClose : undefined} end>
                    <Home size={22} />
                    <span>Ana Sayfa</span>
                </NavLink>

                <NavLink to="/app/profile" style={getLinkStyle('Profil')} onClick={!isDesktop ? onClose : undefined}>
                    <User size={22} />
                    <span>Profil</span>
                </NavLink>

                <NavLink to="/app/map" style={getLinkStyle('Harita')} onClick={!isDesktop ? onClose : undefined}>
                    <MapIcon size={22} />
                    <span>Harita</span>
                </NavLink>

                <NavLink to="/app/leaderboard" style={getLinkStyle('Lider Tahtası')} onClick={!isDesktop ? onClose : undefined}>
                    <Trophy size={22} />
                    <span>Lider Tahtası</span>
                </NavLink>

                <NavLink to="/app/algorithms" style={getLinkStyle('Algoritmalarımız')} onClick={!isDesktop ? onClose : undefined}>
                    <Cpu size={22} />
                    <span>Algoritmalarımız</span>
                </NavLink>
            </aside>

            {/* Duplicate media query removed as we use JS prop now, relying on index.css mobile-only helpers if needed */}
        </>
    );
};

export default Sidebar;