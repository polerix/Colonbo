import React, { useState } from 'react';
import { useSimulatorStore } from '../../store/useSimulatorStore';

export function Polyp({ position }) {
    const [found, setFound] = useState(false);
    const incrementPolyps = useSimulatorStore((state) => state.incrementPolyps);

    const handleClick = (e) => {
        e.stopPropagation();
        if (!found) {
            setFound(true);
            incrementPolyps();
        }
    };

    return (
        <mesh position={position} onClick={handleClick} scale={found ? 0 : 1}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial color={found ? "green" : "purple"} emissive={found ? "green" : "black"} />
        </mesh>
    );
}
