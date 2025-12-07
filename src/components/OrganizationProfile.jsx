import React from 'react';
import { Mail, Phone, MapPin, Globe, Users, Calendar, ArrowRight, Leaf, Moon, MoonStarIcon, CatIcon } from 'lucide-react';
import iyaca from '../assets/iyaca.jpg'

const OrganizationProfile = () => {
    const events = [
        {
            id: 1,
            title: "2025 IYACA HACKATHON",
            date: "5–7 Aralık 2025",
            location: "Saraçoğlu Gençlik Merkezi",
            status: "Başvurular Açık",
            description: "Hackathon, belli bir konu üzerine yenilikçi fikirleri olan takımların; kısıtlı süre içerisinde yaratıcılığını ve teknolojik becerilerini kullanarak proje geliştirdiği bir yarışmadır. 48 saat boyunca fikirlerinizi gerçeğe dönüştürün! Son başvuru: 25 Kasım.",
            link: "https://docs.google.com/forms/d/e/1FAIpQLScm3IT40b-UEh4geo0qk-VWvWPqa1ER1UYXAxjE_5eBE1Pwyg/viewform",
            tags: ["Hackathon", "Teknoloji", "İnovasyon"],
            highlight: true
        },
        {
            id: 2,
            title: "IYACA Münazara Etkinliği",
            date: "27.11.2025",
            location: "IYACA Ofis",
            status: "Tamamlandı",
            description: "Savaşlar yıkıcı mı yoksa yapıcı mı? IYACA'da gerçekleştirdiğimiz münazara etkinliğinde tarihin en tartışmalı konularından birini ele aldık: Savaşların toplumlar üzerindeki etkisi. Katılımcılarımız iki gruba ayrılarak savaşların: Yıkıcı yönlerini ve yapıcı olabilecek yönleri üzerine argümanlar ortaya koydular.",
            tags: ["Münazara", "Tartışma", "Gençlik"]
        },
        {
            id: 3,
            title: "IYACA Bilgi Yarışması",
            date: "15 Kasım 2025",
            location: "IYACA Ofis",
            status: "Tamamlandı",
            description: "Aktif Vatandaşlık Ekibimizle 10 Kasım’a özel anlamlı bir etkinlik düzenledik. Etkinlikte hem bilgi yarışmasıyla bilgimizi tazeledik hem de fikirlerimizi ve duygularımızı paylaştık. Hashtags: #bilgiyarışması #10kasım1938 #iyacagönüllüleri",
            tags: ["Yarışma", "10 Kasım", "Sosyal"]
        },

    ];

    return (
        <div className="card">
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
                paddingBottom: '2rem',
                borderBottom: '1px solid hsl(var(--border))',
                flexWrap: 'wrap'
            }}>
                <img
                    src={iyaca}
                    alt="IYACA Logo"
                    style={{ width: '120px', height: '120px', borderRadius: '1rem', objectFit: 'cover', border: '1px solid hsl(var(--border))' }}
                />
                <div>
                    <h1 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>IYACA - Uluslararası Gençlik Aktiviteleri Merkezi Derneği</h1>
                    <p style={{ color: 'hsl(var(--text-muted))', marginBottom: '1rem' }}>Sivil Toplum Kuruluşu | Ankara, Türkiye</p>
                    <div className="profile-badges">
                        <span className="btn" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', background: 'hsl(var(--accent) / 0.1)', color: 'hsl(var(--primary))' }}>
                            <Users size={16} style={{ marginRight: '0.5rem' }} /> 40000+ Gönüllü
                        </span>
                        <span className="btn" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', background: 'hsl(142, 85%, 36%)', color: 'white' }}>
                            <Leaf size={16} style={{ marginRight: '0.5rem' }} /> Doğa Dostu
                        </span>
                        <span className="btn" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', background: 'hsla(0, 77%, 46%, 1.00)', color: 'white' }}>
                            <MoonStarIcon size={16} style={{ marginRight: '0.5rem' }} /> Ulusal Katkı
                        </span>
                        <span className="btn" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', background: 'hsla(213, 77%, 46%, 1.00)', color: 'white' }}>
                            <CatIcon size={16} style={{ marginRight: '0.5rem' }} /> Patili Dostlar
                        </span>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'hsl(var(--text-muted))' }}>
                    <Globe size={20} />
                    <span>www.iyaca.org</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'hsl(var(--text-muted))' }}>
                    <Mail size={20} />
                    <span>info@iyaca.org</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'hsl(var(--text-muted))' }}>
                    <MapPin size={20} />
                    <span>Çankaya, Ankara</span>
                </div>
            </div>

            <div style={{ marginTop: '3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={20} className="text-primary" />
                        Etkinliklerimiz
                    </h3>
                </div>

                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {events.map((event) => (
                        <div key={event.id} style={{
                            background: event.highlight ? 'linear-gradient(to right, hsl(var(--bg-dark)), hsl(var(--accent) / 0.05))' : 'hsl(var(--bg-dark))',
                            padding: '1.5rem',
                            borderRadius: '1rem',
                            border: event.highlight ? '1px solid hsl(var(--primary) / 0.3)' : '1px solid hsl(var(--border))',
                            display: 'grid',
                            gap: '1rem'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                        <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{event.title}</h4>
                                        <span style={{
                                            fontSize: '0.75rem',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '1rem',
                                            background: event.status === 'Başvurular Açık' ? 'hsl(142, 76%, 36%, 0.1)' : 'hsl(var(--text-muted) / 0.1)',
                                            color: event.status === 'Başvurular Açık' ? 'hsl(142, 76%, 36%)' : 'hsl(var(--text-muted))',
                                            border: `1px solid ${event.status === 'Başvurular Açık' ? 'hsl(142, 76%, 36%, 0.2)' : 'transparent'}`
                                        }}>
                                            {event.status}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'hsl(var(--text-muted))' }}>
                                        <span>📅 {event.date}</span>
                                        <span>📍 {event.location}</span>
                                    </div>
                                </div>
                                {event.highlight && (
                                    <a
                                        href={event.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary"
                                        style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                                    >
                                        Başvuru Yap <ArrowRight size={16} />
                                    </a>
                                )}
                            </div>

                            <p style={{ color: 'hsl(var(--text-muted))', lineHeight: '1.6', fontSize: '0.95rem' }}>
                                {event.description}
                            </p>

                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {event.tags.map((tag, idx) => (
                                    <span key={idx} style={{
                                        fontSize: '0.75rem',
                                        padding: '0.25rem 0.75rem',
                                        background: 'hsl(var(--border))',
                                        borderRadius: '0.5rem',
                                        color: 'hsl(var(--text-muted))'
                                    }}>
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrganizationProfile;
