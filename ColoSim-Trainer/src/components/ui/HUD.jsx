import React from 'react';
import { useSimulatorStore } from '../../store/useSimulatorStore';

export function HUD() {
    const force = useSimulatorStore((state) => state.force);
    const loopDetected = useSimulatorStore((state) => state.loopDetected);
    const polypsFound = useSimulatorStore((state) => state.polypsFound);
    const totalPolyps = useSimulatorStore((state) => state.totalPolyps);
    const startTime = useSimulatorStore((state) => state.startTime);

    // Time formatting
    const [elapsed, setElapsed] = React.useState(0);
    React.useEffect(() => {
        const timer = setInterval(() => {
            setElapsed(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);
        return () => clearInterval(timer);
    }, [startTime]);

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            padding: '20px',
            color: 'white',
            fontFamily: 'monospace',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            {/* Top Bar: Metrics */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', textShadow: '1px 1px 2px black' }}>
                <div>TIME: {formatTime(elapsed)}</div>
                <div>POLYPS: {polypsFound}/{totalPolyps}</div>
            </div>

            {/* Center: Warnings */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'
            }}>
                {loopDetected && (
                    <div style={{
                        fontSize: '3rem',
                        color: 'yellow',
                        border: '4px solid yellow',
                        padding: '20px',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        animation: 'blink 1s infinite'
                    }}>
                        ⚠ LOOP FORMATION WARNING
                    </div>
                )}
            </div>

            {/* Bottom Bar: Force Gauge */}
            <div style={{ width: '100%', paddingBottom: '20px' }}>
                <div style={{ fontSize: '1.2rem', marginBottom: '5px', textShadow: '1px 1px 2px black' }}>FORCE GAUGE</div>
                <div style={{
                    width: '300px',
                    height: '20px',
                    border: '2px solid white',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    background: 'rgba(0,0,0,0.5)'
                }}>
                    <div style={{
                        width: `${Math.min(force, 100)}%`,
                        height: '100%',
                        backgroundColor: force > 80 ? 'red' : force > 50 ? 'orange' : 'lime',
                        transition: 'width 0.1s, background-color 0.2s'
                    }} />
                </div>
                {force > 80 && (
                    <div style={{ color: 'red', fontWeight: 'bold', marginTop: '5px' }}>EXCESSIVE FORCE!</div>
                )}
            </div>

            {/* Screen Flash for Pain */}
            {force > 80 && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'red',
                    opacity: 0.3,
                    zIndex: -1
                }} />
            )}

            <style>{`
        @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 1; }
        }
      `}</style>
        </div>
    );
}
