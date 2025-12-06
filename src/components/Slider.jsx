import React from 'react';

const Slider = () => {
    return (
        <div style={{
            width: '100%',
            height: '180px', // Reduced height as requested
            borderRadius: '1.5rem',
            overflow: 'hidden',
            position: 'relative',
            marginBottom: '2rem',
            boxShadow: '0 10px 30px -5px rgba(0,0,0,0.1)'
        }}>
            <img
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
                alt="Volunteer"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }}
            />
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '2rem',
                background: 'linear-gradient(to top, hsl(0 0% 0% / 0.8), transparent)'
            }}>
                <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>Toplulukla Büyüyün</h3>
                <p style={{ color: 'hsl(0 0% 80%)' }}>Son projeleri inceleyin ve katılın.</p>
            </div>
        </div>
    );
};

export default Slider;
