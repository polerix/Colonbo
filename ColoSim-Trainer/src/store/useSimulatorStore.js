import { create } from 'zustand';

export const useSimulatorStore = create((set) => ({
    force: 0,
    loopDetected: false,
    polypsFound: 0,
    totalPolyps: 5,
    startTime: Date.now(),

    setForce: (force) => set({ force }),
    setLoopDetected: (detected) => set({ loopDetected: detected }),
    incrementPolyps: () => set((state) => ({ polypsFound: state.polypsFound + 1 })),
    reset: () => set({ force: 0, loopDetected: false, polypsFound: 0, startTime: Date.now() }),
}));
