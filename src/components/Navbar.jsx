import React from 'react';
import { Bell, BellPlusIcon, LucideBellDot, MessageSquare, MessageSquareDotIcon, User, Menu } from 'lucide-react';
import sideLogo from '../assets/side-logo.png'

const Navbar = ({ onMenuClick }) => {
    return (
        <nav style={{
            height: '70px',
            borderBottom: '1px solid hsl(var(--border))',
            backgroundColor: 'hsl(var(--bg-card) / 0.8)',
            backdropFilter: 'blur(10px)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            padding: '0 1rem', // Reduced padding for mobile
            justifyContent: 'space-between'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button className="mobile-only" onClick={onMenuClick} style={{ color: 'hsl(var(--text-main))' }}>
                    <Menu size={24} />
                </button>
                <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--primary-dark)))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    <a href="/app/home">
                        <img
                            src={sideLogo}
                            alt="Kuruluş Resim"
                            style={{
                                width: '240px',
                                height: '240px',
                                objectFit: 'contain',
                                display: 'block'
                            }}
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    </a>
                </div>

            </div>

            <div className="desktop-only" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <button style={{ color: 'hsl(var(--text-muted))' }}>
                    <LucideBellDot size={26} />
                </button>
                <button style={{ color: 'hsl(var(--text-muted))' }}>
                    <MessageSquareDotIcon size={26} />
                </button>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-dark)))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                }}>
                    <button style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                        <User size={24} />
                    </button>
                </div>
            </div>

        </nav >
    );
};

export default Navbar;
