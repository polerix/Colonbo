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

    // Demo Mode State
    isDemoMode: false,
    demoState: '',
    setDemoMode: (isDemo) => set({ isDemoMode: isDemo }),
    setDemoState: (stateMsg) => set({ demoState: stateMsg }),

    // Game State
    gameStatus: 'MENU', // 'MENU', 'PLAYING', 'DEMO'
    setGameStatus: (status) => set({ gameStatus: status }),

    reset: () => set({ force: 0, loopDetected: false, polypsFound: 0, startTime: Date.now() }),
}));
