import { CapacityCalculation } from "../domain/calculation/capacity"
import { ConfigurationCalculation } from "../domain/calculation/configuration"
import { DemandCalculation } from "../domain/calculation/demand"
import { UnusedDemandCalculation } from "../domain/calculation/unused-demand"
import { SeatCategory } from "../shared/seat-category"

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
    constructor(
        private readonly capacityCalculation: CapacityCalculation,
        private readonly demandCalculation: DemandCalculation,
        private readonly configurationCalculation: ConfigurationCalculation,
        private readonly unusedDemandCalculation: UnusedDemandCalculation
    ) {}

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

        let unusedDemand: number = seats
        this.unusedDemandCalculation.setFreeSeats(seats)

        this.configurationCalculation.setCapacityTotal(capacityTotal) // eu seto este valor apenas uma vez

        const firstClassConfiguration = this.configurationCalculation.calculate(airportDemand.firstClass)
        unusedDemand =this.unusedDemandCalculation.calculate({seats: firstClassConfiguration, type: SeatCategory.FIRST_CLASS})

        const businessConfiguration = this.configurationCalculation.calculate(airportDemand.business)
        unusedDemand = this.unusedDemandCalculation.calculate({seats: businessConfiguration, type: SeatCategory.BUSINESS})

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


