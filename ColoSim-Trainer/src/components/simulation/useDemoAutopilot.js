import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSimulatorStore } from '../../store/useSimulatorStore';

export function useDemoAutopilot(api, inputs, camera) {
    const isDemoMode = useSimulatorStore((state) => state.isDemoMode);
    const setDemoState = useSimulatorStore((state) => state.setDemoState);

    // State machine for demo sequence
    // 0: Forward
    // 1: Force Demo (Swerve)
    // 2: Recover
    // 3: Loop Demo (Rotate)
    // 4: Reset
    const [phase, setPhase] = useState(0);
    const timer = useRef(0);

    useEffect(() => {
        if (!isDemoMode) {
            setPhase(0);
            timer.current = 0;
            setDemoState('');
            return;
        }
    }, [isDemoMode, setDemoState]);

    useFrame((state, delta) => {
        if (!isDemoMode) return;

        timer.current += delta;

        // Reset inputs
        inputs.current = { forward: false, backward: false, left: false, right: false, mouseX: inputs.current.mouseX, mouseY: inputs.current.mouseY };

        if (phase === 0) {
            setDemoState('Navigation');
            inputs.current.forward = true;
            // Slowly center view
            inputs.current.mouseX *= 0.95;
            inputs.current.mouseY *= 0.95;

            if (timer.current > 5) {
                setPhase(1);
                timer.current = 0;
            }
        } else if (phase === 1) {
            setDemoState('Force Feedback Test');
            inputs.current.forward = true;
            inputs.current.left = true; // Swerve left

            if (timer.current > 2) {
                setPhase(2);
                timer.current = 0;
            }
        } else if (phase === 2) {
            setDemoState('Recovering...');
            inputs.current.backward = true; // Back up

            if (timer.current > 1.5) {
                setPhase(3);
                timer.current = 0;
            }
        } else if (phase === 3) {
            setDemoState('Loop Detection Test');
            // Spin camera
            inputs.current.mouseX += delta * 5;

            if (timer.current > 4) {
                setPhase(0); // Restart loop
                timer.current = 0;
                // Reset look direction
                inputs.current.mouseX = 0;
            }
        }
    });
}
