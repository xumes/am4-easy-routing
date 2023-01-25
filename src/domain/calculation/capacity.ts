import { CalculationInterface } from "../interfaces/calculation-interface"

export type CapacityProps = {
    capacity: number,
    demand: number
}

export class CapacityCalculation implements CalculationInterface<CapacityProps> {
    calculate(value: CapacityProps): number {
        const {capacity, demand} = value
        if ( capacity <=0 || !capacity) {
            throw new Error('Capacity must be positive')
        }

        return Math.floor(demand / capacity)
    }
}