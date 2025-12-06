import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            textAlign: 'center',
            padding: '2rem',
            color: 'hsl(var(--text-muted))',
            fontSize: '0.875rem',
            borderTop: '1px solid hsl(var(--border))',
            marginTop: 'auto'
        }}>
            <p>&copy; {new Date().getFullYear()} Volunext. Tüm hakları saklıdır.</p>
        </footer>
    );
};

export default Footer;
