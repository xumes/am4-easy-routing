import { CapacityCalculation } from "../domain/calculation/capacity"
import { DemandCalculation } from "../domain/calculation/demand"

type Demand = {
    economy: number,
    business: number,
    firstClass: number
}

type SuggestedConfig = {
    aircrafts: number,
    fligtsPerDay: number,
    config: Demand[]
}

export class ConfigurationUsecase {
    constructor(private readonly capacityCalculation: CapacityCalculation, private readonly demandCalculation: DemandCalculation) {}

    execute(seats: number, airportDemand: Demand): SuggestedConfig {

        const demandTotal = this.demandCalculation.calculate({
            economicDemand: airportDemand.economy,
            businessDemand: airportDemand.business,
            firstClassDemand: airportDemand.firstClass
        })

        const capacityTotal = this.capacityCalculation.calculate({
            capacity: seats,
            demand: demandTotal
        })

        // Refactor the following code to move them to the domain
        let unusedDemand: number = seats

        const firstClassConfiguration = Math.floor(
            airportDemand.firstClass / capacityTotal
        )
        unusedDemand = unusedDemand - (firstClassConfiguration * 3)

        const businessConfiguration = Math.floor(
            airportDemand.business / capacityTotal
        )
        unusedDemand = unusedDemand - ( businessConfiguration * 2)

        const config = [
            { economy: unusedDemand, business: businessConfiguration, firstClass: firstClassConfiguration },
            { economy: unusedDemand, business: businessConfiguration, firstClass: firstClassConfiguration }
        ]

        return {
            aircrafts: 1,
            fligtsPerDay: capacityTotal,
            config
        }
    }
}


