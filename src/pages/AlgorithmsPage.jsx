import React, { useState } from 'react';
import {
    Cpu,
    Leaf,
    Users,
    Globe,
    ArrowRight,
    Database,
    Calculator,
    Award,
    ChevronDown,
    ChevronUp,
    FileJson,
    TableProperties,
    BarChart3
} from 'lucide-react';

const AlgorithmsPage = () => {
    const [openStep, setOpenStep] = useState(1);

    const toggleStep = (step) => setOpenStep(openStep === step ? null : step);

    const styles = {
        page: {
            maxWidth: '1200px',
            margin: '0 auto',
            paddingBottom: '3rem',
            color: 'hsl(var(--text-main))',
        },
        header: {
            marginBottom: '3rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, hsl(var(--bg-card)), hsl(var(--bg-dark)))',
            padding: '3rem 1rem',
            borderRadius: '2rem',
            border: '1px solid hsl(var(--border))',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
        },
        badge: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '999px',
            background: 'hsl(var(--primary) / 0.1)',
            color: 'hsl(var(--primary))',
            fontWeight: '600',
            fontSize: '0.9rem',
            marginBottom: '1.5rem',
            border: '1px solid hsl(var(--primary) / 0.2)'
        },
        h1: {
            fontSize: '2.5rem',
            fontWeight: '800',
            marginBottom: '1rem',
            lineHeight: '1.2'
        },
        subtext: {
            color: 'hsl(var(--text-muted))',
            fontSize: '1.1rem',
            maxWidth: '700px',
            margin: '0 auto 2rem'
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
        },
        card: {
            background: 'hsl(var(--bg-card))',
            borderRadius: '1.5rem',
            padding: '2rem',
            border: '1px solid hsl(var(--border))',
            boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
            transition: 'transform 0.2s',
            height: '100%'
        },
        iconBox: {
            width: '3rem',
            height: '3rem',
            borderRadius: '1rem',
            background: 'hsl(var(--primary) / 0.1)',
            color: 'hsl(var(--primary))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem'
        },
        diagramContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            margin: '2rem 0',
            padding: '2rem',
            background: 'hsl(var(--bg-dark))',
            borderRadius: '1.5rem',
            border: '1px dashed hsl(var(--border))'
        },
        diagramNode: {
            background: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '1rem',
            border: '1px solid hsl(var(--border))',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            minWidth: '140px',
            textAlign: 'center'
        },
        arrow: {
            color: 'hsl(var(--text-muted))',
            display: 'flex',
            alignItems: 'center'
        },
        formula: {
            fontFamily: 'monospace',
            background: 'hsl(var(--text-main))',
            color: 'hsl(var(--bg-card))',
            padding: '1.5rem',
            borderRadius: '1rem',
            fontSize: '1.1rem',
            textAlign: 'center',
            marginBottom: '1rem'
        },
        accordionItem: {
            background: 'hsl(var(--bg-card))',
            borderRadius: '1rem',
            border: '1px solid hsl(var(--border))',
            marginBottom: '1rem',
            overflow: 'hidden'
        },
        accordionHeader: {
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            fontWeight: '600'
        }
    };

    return (
        <div style={styles.page}>
            {/* Header */}
            <div style={styles.header}>
                <div style={styles.badge}>
                    <Cpu size={18} /> IMPACT ENGINE v1.0
                </div>
                <h1 style={styles.h1}>Bilimsel Etki Motoru</h1>
                <p style={styles.subtext}>
                    Gönüllülük verilerini uluslararası standartlarla (GRI, SROI, IPCC) işleyerek
                    kanıtlanabilir çevresel ve sosyal etki skoruna (VXP) dönüştürüyoruz.
                </p>

                {/* Visual Concept Diagram */}
                <div style={styles.diagramContainer}>
                    <div style={styles.diagramNode}>
                        <FileJson size={24} className="text-primary" />
                        <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Ham Veri</span>
                        <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>JSON Girdisi</span>
                    </div>
                    <div style={styles.arrow}><ArrowRight size={20} /></div>
                    <div style={{ ...styles.diagramNode, background: 'hsl(var(--primary))', color: 'white', border: 'none' }}>
                        <Cpu size={24} />
                        <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Impact Engine</span>
                        <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>Katsayı x Veri</span>
                    </div>
                    <div style={styles.arrow}><ArrowRight size={20} /></div>
                    <div style={styles.diagramNode}>
                        <Award size={24} className="text-primary" />
                        <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>VXP Skoru</span>
                        <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>Bileşik Etki</span>
                    </div>
                </div>
            </div>

            {/* Core Pillars */}
            <div style={styles.grid}>
                <div style={styles.card}>
                    <div style={styles.iconBox}><Leaf size={24} /></div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Çevresel Etki (EIS)</h3>
                    <p style={{ color: 'hsl(var(--text-muted))', fontSize: '0.9rem' }}>
                        GRI 305 ve IPCC GWP katsayılarıyla karbon ayak izi tasarrufu hesaplanır.
                        Her atık türü ve ağaç dikimi CO₂e cinsine çevrilir.
                    </p>
                </div>
                <div style={styles.card}>
                    <div style={styles.iconBox}><Users size={24} /></div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Sosyal Etki (SIS)</h3>
                    <p style={{ color: 'hsl(var(--text-muted))', fontSize: '0.9rem' }}>
                        SROI metodolojisi ile etki derinliği ölçülür. Ulaşılan kişi sayısı ve
                        fayda kalıcılığı (Duration) formüle dahil edilir.
                    </p>
                </div>
                <div style={styles.card}>
                    <div style={styles.iconBox}><Globe size={24} /></div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Dijital Etki (DIS)</h3>
                    <p style={{ color: 'hsl(var(--text-muted))', fontSize: '0.9rem' }}>
                        Çevrimiçi mentorluk ve açık kaynak katkılarının erişim gücü ve
                        verimlilik çarpanları ile hesaplanır.
                    </p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '2rem', alignItems: 'start' }}>

                {/* How it works - Interactive */}
                <div>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>Nasıl Çalışır?</h2>

                    <div style={styles.accordionItem}>
                        <div style={styles.accordionHeader} onClick={() => toggleStep(1)}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ background: 'hsl(var(--bg-dark))', padding: '0.5rem', borderRadius: '0.5rem' }}><Database size={20} /></div>
                                <span>1. Veri Toplama ve Doğrulama</span>
                            </div>
                            {openStep === 1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>
                        {openStep === 1 && (
                            <div style={{ padding: '0 1.5rem 1.5rem', color: 'hsl(var(--text-muted))', fontSize: '0.95rem' }}>
                                Gönüllü aktiviteleri standart bir JSON şemasıyla sisteme girer.
                                Örn: <code>{`{ type: 'recycling', amount: 50, unit: 'kg', material: 'plastic' }`}</code>.
                                Sistem bu veriyi anomalilere karşı tarar ve temizler.
                            </div>
                        )}
                    </div>

                    <div style={styles.accordionItem}>
                        <div style={styles.accordionHeader} onClick={() => toggleStep(2)}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ background: 'hsl(var(--bg-dark))', padding: '0.5rem', borderRadius: '0.5rem' }}><TableProperties size={20} /></div>
                                <span>2. Katsayı Eşleştirme (Factor Table)</span>
                            </div>
                            {openStep === 2 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>
                        {openStep === 2 && (
                            <div style={{ padding: '0 1.5rem 1.5rem', color: 'hsl(var(--text-muted))', fontSize: '0.95rem' }}>
                                Her aktivite türü, bilimsel literatürden (ISO 14064, UN Reports) alınan katsayılarla çarpılır.
                                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                                    <li>Plastik Atık → 2.0 kg CO₂e / kg</li>
                                    <li>Ağaç Dikimi → 22 kg CO₂e / yıl</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    <div style={styles.accordionItem}>
                        <div style={styles.accordionHeader} onClick={() => toggleStep(3)}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ background: 'hsl(var(--bg-dark))', padding: '0.5rem', borderRadius: '0.5rem' }}><Calculator size={20} /></div>
                                <span>3. Normalizasyon ve Skorlama</span>
                            </div>
                            {openStep === 3 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>
                        {openStep === 3 && (
                            <div style={{ padding: '0 1.5rem 1.5rem', color: 'hsl(var(--text-muted))', fontSize: '0.95rem' }}>
                                Farklı birimlerdeki (kg, saat, kişi) etkiler 0-100 ölçeğinde normalize edilir.
                                Ardından ağırlıklı ortalama ile final <strong>VXP (Volunext Points)</strong> hesaplanır.
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar / Formula Card */}
                <div style={{ ...styles.card, background: 'hsl(var(--bg-dark))', border: 'none' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calculator size={20} className="text-primary" />
                        Hesaplama Mantığı
                    </h3>

                    <div style={styles.formula}>
                        E = x  •  k
                    </div>
                    <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'hsl(var(--text-muted))', marginBottom: '2rem' }}>
                        Etki = Ham Veri • Katsayı
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ background: 'white', padding: '1rem', borderRadius: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Çevresel (EIS)</span>
                            <span style={{ fontWeight: '700', color: 'hsl(var(--primary))' }}>40%</span>
                        </div>
                        <div style={{ background: 'white', padding: '1rem', borderRadius: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Sosyal (SIS)</span>
                            <span style={{ fontWeight: '700', color: 'hsl(var(--primary))' }}>40%</span>
                        </div>
                        <div style={{ background: 'white', padding: '1rem', borderRadius: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Dijital (DIS)</span>
                            <span style={{ fontWeight: '700', color: 'hsl(var(--primary))' }}>20%</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AlgorithmsPage;
