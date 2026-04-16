import React from 'react';

const Hero = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px', background: '#f4f4f4' }}>
            <h1>Welcome to ElderWise!</h1>
            <p>Your health and wellness is our priority.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
                    <h2>Feature 1</h2>
                    <p>Short description of feature 1.</p>
                    <button style={{ background: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px' }}>Learn More</button>
                </div>
                <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
                    <h2>Feature 2</h2>
                    <p>Short description of feature 2.</p>
                    <button style={{ background: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px' }}>Learn More</button>
                </div>
                <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
                    <h2>Feature 3</h2>
                    <p>Short description of feature 3.</p>
                    <button style={{ background: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px' }}>Learn More</button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
