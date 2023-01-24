import { CalculationInterface } from "../interfaces/calculation-interface"

export type DemandProps = {
    economicDemand: number,
    businessDemand: number,
    firstClassDemand: number
}

export class DemandCalculation implements CalculationInterface<DemandProps> {
    calculate(value: DemandProps): number {
        const {economicDemand, businessDemand, firstClassDemand} = value

        if (economicDemand < 0 || businessDemand < 0 || firstClassDemand < 0) {
            throw('Demand cannot be negative')
        }

        const result = (economicDemand * 1) + (businessDemand * 2) + (firstClassDemand * 3)

        return result
    }
}
