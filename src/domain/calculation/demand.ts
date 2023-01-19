export class DemandCalculation {
    calculate(economicDemand: number, businessDemand: number, firstClassDemand: number): number {
        if (economicDemand < 0 || businessDemand < 0 || firstClassDemand < 0) {
            throw('Demand cannot be negative')
        }

        const result = (economicDemand * 1) + (businessDemand * 2) + (firstClassDemand * 3)

        return result
    }
}
