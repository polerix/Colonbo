import * as THREE from 'three';

export function generateColonCurve(segments = 64) {
    const points = [];
    for (let i = 0; i < segments; i++) {
        points.push(
            new THREE.Vector3(
                Math.sin(i * 0.2) * 5 + (Math.random() - 0.5) * 3,
                Math.cos(i * 0.3) * 5 + (Math.random() - 0.5) * 3,
                -i * 5 // Move forward along -Z axis
            )
        );
    }
    return new THREE.CatmullRomCurve3(points);
}
