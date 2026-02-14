import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useTrimesh } from '@react-three/cannon';

export function ColonTunnel({ curve, tubularSegments = 200, radius = 2 }) {
    const geometry = useMemo(() => {
        // Determine the number of segments based on curve length vs detail if needed
        // standard TubeGeometry
        return new THREE.TubeGeometry(curve, tubularSegments, radius, 8, false);
    }, [curve, tubularSegments, radius]);

    const [ref] = useTrimesh(() => ({
        args: [geometry.attributes.position.array, geometry.index.array],
        mass: 0,
        type: 'Static',
    }));

    return (
        <mesh ref={ref} geometry={geometry}>
            <meshStandardMaterial
                color="#d46b6b"
                side={THREE.DoubleSide}
                wireframe={false}
                roughness={0.6}
                metalness={0.1}
                bumpScale={0.1}
            />
        </mesh>
    );
}
