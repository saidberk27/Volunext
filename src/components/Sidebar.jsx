import { NavLink } from 'react-router-dom';
import { Home, Map as MapIcon, User, Trophy, Cpu } from 'lucide-react';

const getLinkStyle = (name) => ({ isActive }) => {

    console.log(`[${name}] isActive: ${isActive}`);

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

// ---

const Sidebar = () => {
    return (
        <aside style={{
            width: '280px',
            borderRight: '1px solid hsl(var(--border))',
            backgroundColor: 'hsl(var(--bg-dark))',
            padding: '2rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 70px)', // Minus navbar height
            position: 'sticky',
            top: '100px',
            zIndex: 90,
            overflowY: 'auto'
        }}>

            <NavLink to="/app/home" style={getLinkStyle('Ana Sayfa')} end>
                <Home size={22} />
                <span>Ana Sayfa</span>
            </NavLink>

            <NavLink to="/app/profile" style={getLinkStyle('Profil')}>
                <User size={22} />
                <span>Profil</span>
            </NavLink>

            <NavLink to="/app/map" style={getLinkStyle('Harita')}>
                <MapIcon size={22} />
                <span>Harita</span>
            </NavLink>

            <NavLink to="/app/leaderboard" style={getLinkStyle('Lider Tahtası')}>
                <Trophy size={22} />
                <span>Lider Tahtası</span>
            </NavLink>

            <NavLink to="/app/algorithms" style={getLinkStyle('Algoritmalarımız')}>
                <Cpu size={22} />
                <span>Algoritmalarımız</span>
            </NavLink>
        </aside>
    );
};

export default Sidebar;