import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import logo from '../assets/logo.png'
import volunteer from '../assets/volunteer.png'
import foundation from '../assets/foundation.png'
const LandingPage = () => {
    const navigate = useNavigate();

    const handleRoleSelect = (role) => {
        localStorage.setItem('userRole', role);
        navigate('/app/home');
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at top right, hsl(var(--primary) / 0.1), transparent 40%), radial-gradient(circle at bottom left, hsl(var(--primary-soft) / 0.3), transparent 40%)'
        }}>
            <div className="container" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1rem' }} className="text-gradient">
                    <img
                        src={logo}
                        alt="Kuruluş Resim"
                        style={{
                            width: '240px',
                            height: '240px',
                            margin: '0 auto',
                            objectFit: 'contain',
                            display: 'block'
                        }}
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                </h1>
                <p style={{ color: 'hsl(var(--text-muted))', fontSize: '2rem', fontWeight: '800', maxWidth: '600px', margin: '0 auto' }}>
                    Volunext
                </p>
                <p style={{ color: 'hsl(var(--text-muted))', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                    Değişimin parçası olun. İster gönüllü olarak katkı sağlayın, ister kuruluşunuzun etkisini büyütün.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                maxWidth: '900px',
                width: '100%',
                padding: '0 1rem'
            }}>
                {/* Volunteer Card */}
                <button
                    className="card"
                    onClick={() => handleRoleSelect('volunteer')}
                    style={{
                        textAlign: 'left',
                        cursor: 'pointer',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '1.5rem',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    {/* User requested image here */}
                    <img
                        src={volunteer}
                        alt="Gönüllü Resim"
                        style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'contain',
                            display: 'block'
                        }}
                        onError={(e) => {
                            e.target.style.display = 'none'; // Hide if not found (fallback logic could go here)
                            // Fallback to icon if needed, but keeping user intent
                        }}
                    />
                    <div>
                        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Gönüllüyüm</h2>
                        <p style={{ color: 'hsl(var(--text-muted))' }}>
                            Projeleri keşfet, yeteneklerini kullan ve topluma değer kat.
                        </p>
                    </div>
                    <div style={{
                        marginTop: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'hsl(var(--primary))',
                        fontWeight: '600'
                    }}>
                        Giriş Yap <ArrowRight size={20} />
                    </div>
                </button>

                {/* Organization Card */}
                <button
                    className="card"
                    onClick={() => handleRoleSelect('organization')}
                    style={{
                        textAlign: 'left',
                        cursor: 'pointer',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '1.5rem',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <img
                        src={foundation}
                        alt="Kuruluş Resim"
                        style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'contain',
                            display: 'block'
                        }}
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />

                    <div>
                        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Kuruluşum</h2>
                        <p style={{ color: 'hsl(var(--text-muted))' }}>
                            Gönüllüleri bul, projelerini yönet ve etkini artır.
                        </p>
                    </div>
                    <div style={{
                        marginTop: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'hsl(var(--primary-dark))',
                        fontWeight: '600'
                    }}>
                        Devam Et <ArrowRight size={20} />
                    </div>
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
