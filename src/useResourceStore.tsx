import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ResourceState = {
    terraformRating: number;
    credit: number;
    creditProduction: number;
    steel: number;
    steelProduction: number;
    titanium: number;
    titaniumProduction: number;
    plants: number;
    plantsProduction: number;
    power: number;
    powerProduction: number;
    heat: number;
    heatProduction: number;
    creditPerSteel: number;
    creditPerTitanium: number;
    plantPerGreenery: number;
    heatPerTemperature: number;
    setResource: (key: keyof ResourceState, value: number) => void;
};

export const useResourceStore = create<ResourceState>()(
    persist(
        (set) => ({
            terraformRating: 20,
            credit: 0,
            creditProduction: 0,
            steel: 0,
            steelProduction: 0,
            titanium: 0,
            titaniumProduction: 0,
            plants: 0,
            plantsProduction: 0,
            power: 0,
            powerProduction: 0,
            heat: 0,
            heatProduction: 0,
            creditPerSteel: 2,
            creditPerTitanium: 3,
            plantPerGreenery: 8,
            heatPerTemperature: 8,
            setResource: (key, value) => set((state) => ({ ...state, [key]: value })),
        }),
        {
            name: 'resource-storage', // The key in localStorage
        }
    )
);
