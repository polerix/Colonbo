import React from 'react';
import { useSimulatorStore } from '../../store/useSimulatorStore';

export function StartMenu() {
    const setGameStatus = useSimulatorStore((state) => state.setGameStatus);
    const setDemoMode = useSimulatorStore((state) => state.setDemoMode);
    const reset = useSimulatorStore((state) => state.reset);

    const handleStart = () => {
        setDemoMode(false);
        reset();
        setGameStatus('PLAYING');
        // Request pointer lock only on user interaction in scene, or here if possible, 
        // but usually better to let the click on the scene handle it.
    };

    const handleDemo = () => {
        reset();
        setDemoMode(true);
        setGameStatus('DEMO');
    };

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            zIndex: 100,
            fontFamily: 'sans-serif'
        }}>
            <h1 style={{ fontSize: '4rem', marginBottom: '10px', color: '#ff6b6b' }}>ColoSim-Trainer</h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '40px', color: '#ccc' }}>Evidence-Based Colonoscopy Simulation</p>

            <div style={{ display: 'flex', gap: '40px', marginBottom: '50px' }}>
                <div style={{ textAlign: 'left', border: '1px solid #555', padding: '20px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                    <h2 style={{ borderBottom: '1px solid #555', paddingBottom: '10px', marginBottom: '20px' }}>CONTROLS</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '10px', fontSize: '1.1rem' }}>
                        <div style={{ color: 'cyan', fontWeight: 'bold' }}>W / S</div>
                        <div>Insert / Withdraw Scope</div>

                        <div style={{ color: 'cyan', fontWeight: 'bold' }}>Mouse</div>
                        <div>Tip Deflection (Look)</div>

                        <div style={{ color: 'cyan', fontWeight: 'bold' }}>A / D</div>
                        <div>Rotate Scope (Torque)</div>

                        <div style={{ color: 'cyan', fontWeight: 'bold' }}>CLICK</div>
                        <div>Capture Cursor / Start</div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
                    <button
                        onClick={handleStart}
                        style={{
                            padding: '15px 40px',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            transition: 'transform 0.1s'
                        }}
                        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        START TRAINING
                    </button>

                    <button
                        onClick={handleDemo}
                        style={{
                            padding: '15px 40px',
                            fontSize: '1.2rem',
                            backgroundColor: 'transparent',
                            color: 'cyan',
                            border: '2px solid cyan',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        WATCH DEMO
                    </button>
                </div>
            </div>

            <div style={{ fontSize: '0.9rem', color: '#777', maxWidth: '600px', textAlign: 'center' }}>
                <p>Goal: Navigate to the end of the colon while minimizing loop formation and excessive force on the colon walls. Find all polyps.</p>
            </div>
        </div>
    );
}
