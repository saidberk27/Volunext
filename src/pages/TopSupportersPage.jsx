import React from 'react';
import { Trophy, TrendingUp, Building2, ExternalLink } from 'lucide-react';

const TopSupportersPage = () => {
    const supporters = [
        {
            id: 1,
            name: "Migros",
            amount: "230.000 TL",
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9rKaWbaNEeeWXkX2p3WVBicDIs8o8m7AuvQ&s", // Using a likely stable URL, if fails will fallback with alt
            color: "#FF7900", // Migros Orange
            description: "Sürdürülebilirlik ve gıda bağışları ile öncü.",
            highlight: "Gıda Kurtarma Projesi"
        },
        {
            id: 2,
            name: "LC Waikiki",
            amount: "180.000 TL",
            logo: "https://mir-s3-cdn-cf.behance.net/projects/404/6fd338150622045.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png",
            color: "#005EB8", // LCW Blue
            description: "Eğitim ve giyim yardımlarında büyük destek.",
            highlight: "Geleceğim Sensin"
        },
        {
            id: 3,
            name: "Havelsan",
            amount: "120.000 TL",
            logo: "https://www.yuzde100yerli.com/wp-content/uploads/2006/07/havelsan-logo-1.jpg",
            color: "#004B93", // Havelsan Blue
            description: "Teknoloji odaklı gönüllülük projeleri.",
            highlight: "Tekno-Gönüllü"
        }
    ];

    return (
        <div className="container" style={{ paddingBottom: '2rem' }}>
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h1 className="text-gradient" style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    Gönüllülük Liderleri
                </h1>
                <p style={{ color: 'hsl(var(--text-muted))' }}>
                    Bu ay ekosistemimize en çok değer katan kurumlar
                </p>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {supporters.map((company, index) => (
                    <div key={company.id} className="card" style={{
                        display: 'flex',
                        flexDirection: 'column', // Mobile first (stacked)
                        padding: '0',
                        overflow: 'hidden',
                        position: 'relative',
                        borderLeft: `6px solid ${company.color}`
                    }}>
                        {/* Rank Badge */}
                        <div style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            background: index === 0 ? 'linear-gradient(135deg, #FFD700, #FDB931)' :
                                index === 1 ? 'linear-gradient(135deg, #C0C0C0, #E0E0E0)' :
                                    'linear-gradient(135deg, #CD7F32, #B87333)',
                            color: 'white',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                            zIndex: 10
                        }}>
                            {index + 1}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', md: { flexDirection: 'row' } }}>
                            {/* Mobile Layout: Stacked, but we can do responsive styles via JS or className if needed. 
                                Since we use inline, let's make it flex-wrap or media query based? 
                                Actually, the user asked for "Mobil uyumlu", so standard block flow is fine, maybe flex-row on desktop.
                                I'll use a style object with a small media query hack or just flex-wrap.
                             */}

                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                width: '100%'
                            }}>
                                {/* Logo Section */}
                                <div style={{
                                    padding: '2rem',
                                    flex: '0 0 100%',
                                    minWidth: '200px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    background: 'linear-gradient(to right, #f9fafb, #ffffff)'
                                }} className="desktop:flex-1"> {/* Ideally 1/3 width on desktop */}
                                    <div style={{
                                        width: '120px',
                                        height: '120px',
                                        borderRadius: '50%',
                                        backgroundColor: 'white',
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                        padding: '1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <img
                                            src={company.logo}
                                            alt={company.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.style.display = 'none';
                                                e.target.parentElement.innerText = company.name[0];
                                                e.target.parentElement.style.fontSize = "2rem";
                                                e.target.parentElement.style.fontWeight = "bold";
                                                e.target.parentElement.style.color = company.color;
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div style={{ padding: '1.5rem', flex: '1' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{company.name}</h2>
                                        <Building2 size={18} color="hsl(var(--text-muted))" />
                                    </div>

                                    <p style={{ color: 'hsl(var(--text-muted))', marginBottom: '1rem' }}>
                                        {company.description}
                                    </p>

                                    <div style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        backgroundColor: 'hsl(var(--primary) / 0.1)',
                                        color: 'hsl(var(--primary-dark))',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '2rem',
                                        fontWeight: '600',
                                        fontSize: '0.9rem'
                                    }}>
                                        <TrendingUp size={16} />
                                        Proje: {company.highlight}
                                    </div>
                                </div>

                                {/* Amount Section */}
                                <div style={{
                                    padding: '1.5rem',
                                    flex: '0 0 auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    justifyContent: 'center',
                                    minWidth: '200px',
                                    borderTop: '1px solid #f0f0f0'
                                }}>
                                    <span style={{ fontSize: '0.9rem', color: 'hsl(var(--text-muted))', marginBottom: '0.25rem' }}>Toplam Katkı</span>
                                    <span style={{
                                        fontSize: '2rem',
                                        fontWeight: '800',
                                        color: company.color
                                    }}>
                                        {company.amount}
                                    </span>
                                    <button className="btn" style={{
                                        marginTop: '1rem',
                                        border: `1px solid ${company.color}`,
                                        color: company.color,
                                        padding: '0.5rem 1rem',
                                        fontSize: '0.9rem'
                                    }}>
                                        Profili İncele <ExternalLink size={14} style={{ marginLeft: '0.5rem' }} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sponsorship CTA */}
            <div className="card" style={{
                marginTop: '2rem',
                textAlign: 'center',
                background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-dark)))',
                color: 'white',
                border: 'none'
            }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    Siz de Destek Olun!
                </h3>
                <p style={{ marginBottom: '1.5rem', opacity: '0.9' }}>
                    Şirketinizin katkılarını burada sergilemek ve ekosisteme güç vermek için bize ulaşın.
                </p>
                <button style={{
                    backgroundColor: 'white',
                    color: 'hsl(var(--primary-dark))',
                    padding: '0.75rem 2rem',
                    borderRadius: '2rem',
                    fontWeight: 'bold',
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                }}>
                    İletişime Geç
                </button>
            </div>

            {/* Desktop responsive hacks (since we are using inline styles mostly, 
                we can add a style block for desktop adjustments) */}
            <style>{`
                @media (min-width: 768px) {
                    .desktop\\:flex-1 {
                        flex: 0 0 250px !important;
                        border-right: 1px solid #f0f0f0;
                    }
                    .amount-section {
                        border-top: none !important;
                        border-left: 1px solid #f0f0f0;
                        align-items: flex-end !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default TopSupportersPage;
