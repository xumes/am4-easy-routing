export class CapacityCalculation {
    calculate(demand: number, capacity: number): number {
        if ( capacity <=0 || !capacity) {
            throw new Error('Capacity must be positive')
        }

        return demand / capacity
    }
}