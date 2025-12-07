import React, { useState } from 'react';
import { Mail, Phone, MapPin, Award, Droplets, Fish, TreePine, CatIcon, X } from 'lucide-react';
import certificate from '../assets/certificate.png';

const VolunteerProfile = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const PAST_EVENTS = [
        {
            id: 1,
            title: "Sokak Hayvanlarını Besleme",
            date: "12 Kasım 2024",
            organization: "Pati Dostları Derneği",
            image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=500"
        },
        {
            id: 2,
            title: "Şehir Parkı Temizliği",
            date: "28 Ekim 2024",
            organization: "Yeşil Şehir İnisiyatifi",
            image: "https://akcaabat.bel.tr/uploads/HABERLER/227.jpg?auto=format&fit=crop&q=80&w=500"
        },
        {
            id: 3,
            title: "Köy Okulu Kütüphane Kurulumu",
            date: "15 Ekim 2024",
            organization: "Eğitim Gönüllüleri",
            image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=500"
        },
        {
            id: 4,
            title: "Yaşlı Bakımevi Ziyareti",
            date: "05 Ekim 2024",
            organization: "Sevgi Eli Derneği",
            image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=500"
        }
    ];

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
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {PAST_EVENTS.map(event => (
                        <div key={event.id} style={{
                            background: 'white',
                            borderRadius: '1rem',
                            border: '1px solid hsl(var(--border))',
                            overflow: 'hidden',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                            transition: 'transform 0.2s ease-in-out'
                        }}>
                            <div style={{ height: '160px', overflow: 'hidden' }}>
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                    onMouseOver={e => e.target.style.transform = 'scale(1.1)'}
                                    onMouseOut={e => e.target.style.transform = 'scale(1)'}
                                />
                            </div>
                            <div style={{ padding: '1.25rem' }}>
                                <div style={{ fontSize: '0.8rem', color: 'hsl(var(--primary))', marginBottom: '0.5rem', fontWeight: '600' }}>
                                    {event.organization}
                                </div>
                                <h4 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>{event.title}</h4>
                                <div style={{ fontSize: '0.85rem', color: 'hsl(var(--text-muted))', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }}></span>
                                    Tamamlandı • {event.date}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Certificates Section */}
            <div style={{ marginTop: '3rem' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Sertifikalarım</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '1rem',
                        border: '1px solid hsl(var(--border))',
                        padding: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        transition: 'transform 0.2s',
                        cursor: 'pointer'
                    }}
                        onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                        onClick={() => setSelectedImage(certificate)}
                    >
                        <div style={{
                            width: '100%',
                            height: '200px',
                            background: '#f3f4f6',
                            borderRadius: '0.5rem',
                            overflow: 'hidden',
                            border: '1px solid #e5e7eb'
                        }}>
                            <img src={certificate} alt="Sertifika" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <div>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Üstün Gönüllü Hizmet Belgesi</h4>
                            <p style={{ fontSize: '0.9rem', color: 'hsl(var(--text-muted))' }}>Gönüllülük Federasyonu • 2024</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 2000,
                        cursor: 'zoom-out'
                    }}
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            background: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            zIndex: 2001
                        }}
                    >
                        <X size={24} color="black" />
                    </button>
                    <img
                        src={selectedImage}
                        alt="Full Screen Certificate"
                        style={{
                            maxWidth: '90%',
                            maxHeight: '90%',
                            objectFit: 'contain',
                            borderRadius: '8px',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default VolunteerProfile;
