import React, { useState } from 'react';
import { Trophy, Medal, Award, Crown, Star } from 'lucide-react';

const LeaderboardPage = () => {
    const [timeFrame, setTimeFrame] = useState('week'); // 'week' or 'month'

    // Mock data generator helper
    const generateUsers = (count, frame) => {
        const maleNames = [
            "Ali Özen", "Şahin Kaya", "Said Berk", "Ahmet Kaya", "Mehmet Belen",
            "Yusuf Aydın", "Can Yılmaz", "Emre Demir", "Burak Çelik", "Murat koç",
            "Hakan Şen", "Okan Yıldız", "Tolga Kara", "Barış Tunç", "Arda Güler",
            "Mert Çetin", "Efe Korkmaz", "Kerem Aktürkoğlu"
        ];

        const femaleNames = [
            "Merve Keleş", "Ceren Akmeşe", "Şevval Çakmak", "Zeynep Yılmaz",
            "Elif Demir", "Aslı Çelik", "Gamze Koç", "Gizem Şen", "Buse Yıldız",
            "Sena Kara", "İrem Tunç", "Ezgi Güler", "Ayşe Çetin", "Fatma Korkmaz"
        ];

        // Combine and shuffle slightly or just toggle
        let generatedUsers = [];
        let mIdx = 0, fIdx = 0;

        for (let i = 0; i < count; i++) {
            let user;

            // Alternating pattern or random to mix
            if (i % 2 === 0 && mIdx < maleNames.length) {
                user = {
                    name: maleNames[mIdx],
                    gender: 'male',
                    id: i + 1
                };
                mIdx++;
            } else if (fIdx < femaleNames.length) {
                user = {
                    name: femaleNames[fIdx],
                    gender: 'female',
                    id: i + 1
                };
                fIdx++;
            } else {
                // Fallback if runs out of specific names
                // But we have enough names in list for 15 users
                const isMale = Math.random() > 0.5;
                user = {
                    name: isMale ? `Kullanıcı ${i}` : `Kullanıcı ${i}`,
                    gender: isMale ? 'male' : 'female',
                    id: i + 1
                };
            }

            // Points logic
            let points = frame === 'week' ? 500 - (i * 15) - Math.floor(Math.random() * 10) : 2000 - (i * 60) - Math.floor(Math.random() * 50);

            // Avatar based on gender
            // Using a consistent service for gendered avatars
            user.avatar = user.gender === 'male'
                ? `https://avatar.iran.liara.run/public/boy?username=${user.name.replace(/\s/g, '')}`
                : `https://avatar.iran.liara.run/public/girl?username=${user.name.replace(/\s/g, '')}`;

            user.points = Math.max(points, 0);
            user.projectCount = Math.floor(user.points / 50) + 1;
            user.isTrendUp = Math.random() > 0.5;

            generatedUsers.push(user);
        }

        // Ensure Yusuf Aydın is last if present (he is in maleNames list)
        const yusufIndex = generatedUsers.findIndex(u => u.name === "Yusuf Aydın");
        if (yusufIndex !== -1) {
            const yusuf = generatedUsers.splice(yusufIndex, 1)[0];
            // Force rank/score for Yusuf to be low
            yusuf.points = 42;
            yusuf.projectCount = 1;
            generatedUsers.push(yusuf);
        }

        return generatedUsers;
    };

    const weeklyData = generateUsers(15, 'week');
    const monthlyData = generateUsers(15, 'month');

    const currentData = timeFrame === 'week' ? weeklyData : monthlyData;

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '2rem' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Trophy size={32} className="text-primary" />
                        Lider Tahtası
                    </h1>
                    <p style={{ color: 'hsl(var(--text-muted))' }}>
                        En aktif gönüllülerimizi keşfedin ve topluluğa katkılarını kutlayın.
                    </p>
                </div>

                <div style={{
                    display: 'flex',
                    background: 'hsl(var(--bg-dark))',
                    padding: '4px',
                    borderRadius: '12px',
                    border: '1px solid hsl(var(--border))'
                }}>
                    <button
                        onClick={() => setTimeFrame('week')}
                        style={{
                            padding: '8px 24px',
                            borderRadius: '8px',
                            border: 'none',
                            background: timeFrame === 'week' ? 'hsl(var(--primary))' : 'transparent',
                            color: timeFrame === 'week' ? 'white' : 'hsl(var(--text-muted))',
                            fontWeight: timeFrame === 'week' ? '600' : '400',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        Bu Hafta
                    </button>
                    <button
                        onClick={() => setTimeFrame('month')}
                        style={{
                            padding: '8px 24px',
                            borderRadius: '8px',
                            border: 'none',
                            background: timeFrame === 'month' ? 'hsl(var(--primary))' : 'transparent',
                            color: timeFrame === 'month' ? 'white' : 'hsl(var(--text-muted))',
                            fontWeight: timeFrame === 'month' ? '600' : '400',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        Bu Ay
                    </button>
                </div>
            </div>

            {/* Top 3 Podium */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                gap: '2rem',
                marginBottom: '4rem',
                marginTop: '2rem'
            }}>
                {/* 2nd Place */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ position: 'relative', marginBottom: '1rem' }}>
                        <img
                            src={currentData[1].avatar}
                            alt={currentData[1].name}
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                border: '4px solid #C0C0C0',
                                objectFit: 'cover'
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            bottom: -10,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: '#C0C0C0',
                            color: 'white',
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '12px'
                        }}>2</div>
                    </div>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>{currentData[1].name}</div>
                    <div style={{
                        marginTop: '1rem',
                        height: '100px',
                        width: '80px',
                        background: 'linear-gradient(to top, #C0C0C0, rgba(192, 192, 192, 0.2))',
                        borderRadius: '8px 8px 0 0',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        paddingBottom: '1rem',
                        fontWeight: 'bold',
                        color: 'white'
                    }}>
                        {currentData[1].points} P
                    </div>
                </div>

                {/* 1st Place */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'scale(1.1)' }}>
                    <div style={{ position: 'relative', marginBottom: '1rem' }}>
                        <Crown
                            size={32}
                            style={{
                                position: 'absolute',
                                top: -40,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                color: '#FFD700',
                                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))'
                            }}
                        />
                        <img
                            src={currentData[0].avatar}
                            alt={currentData[0].name}
                            style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                border: '4px solid #FFD700',
                                objectFit: 'cover',
                                boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)'
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            bottom: -10,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: '#FFD700',
                            color: 'white',
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '14px'
                        }}>1</div>
                    </div>
                    <div style={{ fontWeight: '600', marginBottom: '4px', fontSize: '1.1rem' }}>{currentData[0].name}</div>
                    <div style={{
                        marginTop: '1rem',
                        height: '140px',
                        width: '100px',
                        background: 'linear-gradient(to top, #FFD700, rgba(255, 215, 0, 0.2))',
                        borderRadius: '12px 12px 0 0',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        paddingBottom: '1rem',
                        fontWeight: 'bold',
                        color: 'white',
                        fontSize: '1.2rem'
                    }}>
                        {currentData[0].points} P
                    </div>
                </div>

                {/* 3rd Place */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ position: 'relative', marginBottom: '1rem' }}>
                        <img
                            src={currentData[2].avatar}
                            alt={currentData[2].name}
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                border: '4px solid #CD7F32',
                                objectFit: 'cover'
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            bottom: -10,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: '#CD7F32',
                            color: 'white',
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '12px'
                        }}>3</div>
                    </div>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>{currentData[2].name}</div>
                    <div style={{
                        marginTop: '1rem',
                        height: '70px',
                        width: '80px',
                        background: 'linear-gradient(to top, #CD7F32, rgba(205, 127, 50, 0.2))',
                        borderRadius: '8px 8px 0 0',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        paddingBottom: '1rem',
                        fontWeight: 'bold',
                        color: 'white'
                    }}>
                        {currentData[2].points} P
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="card" style={{ padding: '0.5rem' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '50px 3fr 1fr',
                    padding: '1rem',
                    borderBottom: '1px solid hsl(var(--border))',
                    color: 'hsl(var(--text-muted))',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                }}>
                    <div>#</div>
                    <div>Gönüllü</div>
                    <div style={{ textAlign: 'right' }}>Puan</div>
                </div>

                {currentData.slice(3).map((user, index) => (
                    <div key={user.id} style={{
                        display: 'grid',
                        gridTemplateColumns: '50px 3fr 1fr',
                        padding: '1rem',
                        alignItems: 'center',
                        borderBottom: index !== currentData.length - 4 ? '1px solid hsl(var(--border))' : 'none',
                        transition: 'background-color 0.2s',
                        cursor: 'default'
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'hsl(var(--bg-dark))'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        <div style={{ fontWeight: '600', color: 'hsl(var(--text-muted))' }}>{index + 4}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <img
                                src={user.avatar}
                                alt={user.name}
                                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                            <div>
                                <div style={{ fontWeight: '500' }}>{user.name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>{user.projectCount} Proje</div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right', fontWeight: 'bold', color: 'hsl(var(--primary))' }}>
                            {user.points} P
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeaderboardPage;
