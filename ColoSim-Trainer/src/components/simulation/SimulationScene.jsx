import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { OrbitControls, Environment } from '@react-three/drei';
import { ColonTunnel } from './ColonTunnel';
import { ScopeCamera } from './ScopeCamera';
import { HUD } from '../ui/HUD';
import { Polyp } from './Polyp';
import { generateColonCurve } from '../../utils/curveGenerator';
import * as React from 'react';

export function SimulationScene() {
    const curve = React.useMemo(() => generateColonCurve(100), []);
    // Generate polyps along curve
    const polyps = React.useMemo(() => {
        const positions = [];
        for (let i = 0; i < 5; i++) {
            const t = 0.1 + Math.random() * 0.8; // Random position along detection path (10% to 90%)
            const point = curve.getPointAt(t);
            // Offset slightly from center to be on wall?
            // For simplicity, just on path for now, player has to look at them
            // Or calculate normal and push out.
            // Let's just put them near center
            positions.push(point);
        }
        return positions;
    }, [curve]);

    return (
        <div style={{ width: '100vw', height: '100vh', background: '#111', position: 'relative' }}>
            <HUD />
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />

                    <Physics gravity={[0, 0, 0]}>
                        <ScopeCamera />
                        <ColonTunnel curve={curve} />
                    </Physics>

                    {polyps.map((pos, i) => (
                        <Polyp key={i} position={pos} />
                    ))}

                    <Environment preset="sunset" />
                </Suspense>
            </Canvas>
        </div>
    );
}
