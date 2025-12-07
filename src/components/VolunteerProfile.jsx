import React from 'react';
import { Mail, Phone, MapPin, Award, Droplets, Fish, TreePine, CatIcon } from 'lucide-react';

const VolunteerProfile = () => {
    return (
        <div className="card">
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
                paddingBottom: '2rem',
                borderBottom: '1px solid hsl(var(--border))'
            }}>
                <img
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                    alt="Profile"
                    style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid hsl(var(--bg-card))', boxShadow: '0 0 0 2px hsl(var(--primary))' }}
                />
                <div>
                    <h1 style={{ marginBottom: '0.5rem' }}>Ahmet Yılmaz</h1>
                    <p style={{ color: 'hsl(var(--text-muted))', marginBottom: '1rem' }}>Gönüllü | Ankara</p>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <span className="btn" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', background: 'hsl(200, 70%, 50%)', color: 'white', display: 'flex', alignItems: 'center' }}>
                            <Award size={16} style={{ marginRight: '0.5rem' }} /> Gönüllü Puanı: 1250
                        </span>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'hsl(var(--text-muted))' }}>
                    <Mail size={20} />
                    <span>ahmet.yilmaz@example.com</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'hsl(var(--text-muted))' }}>
                    <Phone size={20} />
                    <span>+90 555 123 45 67</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'hsl(var(--text-muted))' }}>
                    <MapPin size={20} />
                    <span>Çankaya, Ankara</span>
                </div>
            </div>

            {/* Impact Stats */}
            <div style={{ marginTop: '3rem' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Etki Raporu</h3>
                <div className="impact-stats-grid">
                    {/* Water */}
                    <div style={{
                        background: 'linear-gradient(135deg, hsl(200, 80%, 95%), hsl(200, 80%, 90%))',
                        padding: '1.5rem',
                        borderRadius: '1rem',
                        border: '1px solid hsl(200, 80%, 80%)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        <div style={{
                            background: 'white',
                            padding: '1rem',
                            borderRadius: '50%',
                            color: 'hsl(200, 80%, 50%)',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                        }}>
                            <Droplets size={24} />
                        </div>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'hsl(200, 80%, 30%)' }}>340 L</div>
                            <div style={{ fontSize: '0.875rem', color: 'hsl(200, 80%, 40%)' }}>Su Temizlendi</div>
                        </div>
                    </div>



                    {/* Tree */}
                    <div style={{
                        background: 'linear-gradient(135deg, hsl(140, 60%, 95%), hsl(140, 60%, 90%))',
                        padding: '1.5rem',
                        borderRadius: '1rem',
                        border: '1px solid hsl(140, 60%, 80%)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        <div style={{
                            background: 'white',
                            padding: '1rem',
                            borderRadius: '50%',
                            color: 'hsl(140, 60%, 50%)',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                        }}>
                            <TreePine size={24} />
                        </div>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'hsl(140, 60%, 30%)' }}>56 Adet</div>
                            <div style={{ fontSize: '0.875rem', color: 'hsl(140, 60%, 40%)' }}>Ağaç Kurtarıldı</div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '3rem' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Katıldığı Projeler</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                    {[1, 2, 3].map(i => (
                        <div key={i} style={{
                            background: 'hsl(var(--bg-dark))',
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            border: '1px solid hsl(var(--border))'
                        }}>
                            <div style={{ height: '100px', background: 'hsl(var(--border))', borderRadius: '0.25rem', marginBottom: '0.5rem' }}></div>
                            <p style={{ fontWeight: '600' }}>Şehir Temizliği #{i}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VolunteerProfile;
