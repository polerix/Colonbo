import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import * as THREE from 'three';
import { useSimulatorStore } from '../../store/useSimulatorStore';

export function ScopeCamera() {
    const { camera } = useThree();
    const setForce = useSimulatorStore((state) => state.setForce);
    const setLoopDetected = useSimulatorStore((state) => state.setLoopDetected);

    const [ref, api] = useSphere(() => ({
        mass: 1,
        position: [0, 0, 5],
        args: [0.5],
        fixedRotation: true,
        linearDamping: 0.9,
        onCollide: (e) => {
            // Calculate force based on impact velocity
            const impact = e.contact.impactVelocity;
            // Normalize impact to 0-100 range roughly
            const forceVal = Math.min(impact * 10, 100);
            // Only update if force is significant
            if (forceVal > 5) {
                setForce(forceVal);
            }
        }
    }));

    const velocity = useRef([0, 0, 0]);
    useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [api.velocity]);

    const inputs = useRef({
        forward: false,
        backward: false,
        left: false,
        right: false,
        mouseX: 0,
        mouseY: 0,
    });

    // Track cumulative rotation for loop detection
    const rotationParams = useRef({ totalYaw: 0, lastYaw: 0 });

    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key.toLowerCase()) {
                case 'w': inputs.current.forward = true; break;
                case 's': inputs.current.backward = true; break;
                case 'a': inputs.current.left = true; break;
                case 'd': inputs.current.right = true; break;
            }
        };
        const handleKeyUp = (e) => {
            switch (e.key.toLowerCase()) {
                case 'w': inputs.current.forward = false; break;
                case 's': inputs.current.backward = false; break;
                case 'a': inputs.current.left = false; break;
                case 'd': inputs.current.right = false; break;
            }
        };

        const handleMouseMove = (e) => {
            if (document.pointerLockElement) {
                inputs.current.mouseX -= e.movementX * 0.002;
                inputs.current.mouseY -= e.movementY * 0.002;
            }
        };

        const handleClick = () => {
            document.body.requestPointerLock();
        }

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('click', handleClick);
        };
    }, []);

    useFrame(() => {
        camera.position.copy(ref.current.position);

        // FPS Camera Rotation
        camera.rotation.order = 'YXZ';
        camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, inputs.current.mouseY));
        const currentYaw = inputs.current.mouseX;
        camera.rotation.y = currentYaw;

        // Loop Detection Logic
        const deltaYaw = currentYaw - rotationParams.current.lastYaw;
        rotationParams.current.totalYaw += Math.abs(deltaYaw);
        rotationParams.current.lastYaw = currentYaw;

        // Reset loop detection if moving forward securely
        if (inputs.current.forward) {
            rotationParams.current.totalYaw *= 0.99; // Decay loop counter when moving straight
        }

        // Threshold for loop warning (e.g., 2 full rotations accumulated locally)
        if (rotationParams.current.totalYaw > Math.PI * 4) {
            setLoopDetected(true);
        } else {
            setLoopDetected(false);
        }

        // Controls
        const direction = new THREE.Vector3();
        const frontVector = new THREE.Vector3(
            0,
            0,
            Number(inputs.current.backward) - Number(inputs.current.forward)
        );
        const sideVector = new THREE.Vector3(
            Number(inputs.current.left) - Number(inputs.current.right),
            0,
            0
        );

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(5)
            .applyEuler(camera.rotation);

        api.velocity.set(direction.x, direction.y, direction.z);

        // Decay force
        useSimulatorStore.setState((state) => ({ force: Math.max(0, state.force * 0.95) }));
    });

    return (
        <mesh ref={ref} visible={false}>
            <sphereGeometry args={[0.5]} />
        </mesh>
    );
}
