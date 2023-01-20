export class CapacityCalculation {
    calculate(demand: number, capacity: number): number {
        if (capacity <=0) {
            throw new Error('Capacity must be positive')
        }

        return demand / capacity
    }
}