import { CapacityCalculation } from "../domain/calculation/capacity"
import { ConfigurationCalculation } from "../domain/calculation/configuration"
import { DemandCalculation } from "../domain/calculation/demand"
import { UnusedDemandCalculation } from "../domain/calculation/unused-demand"
import { SeatCategory } from "../shared/seat-category"

export type Demand = {
    economy: number,
    business: number,
    firstClass: number
}

type SuggestedConfig = {
    configHours: number,
    configuration: ConfigurationProps
}

type ConfigurationProps = {
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

    execute(seats: number, airportDemand: Demand): SuggestedConfig[] {
        const demandTotal = this.demandCalculation.calculate({
            economicDemand: airportDemand.economy,
            businessDemand: airportDemand.business,
            firstClassDemand: airportDemand.firstClass
        })

        const capacityTotal = this.capacityCalculation.calculate({
            capacity: seats,
            demand: demandTotal
        })

        let config12h: Demand[] = []
        let config8h: Demand[] = []

        let capacity12h = 0
        let capacity8h = 0

        let fligts12hPerDay = 0
        let fligts8hPerDay = 0

        let aircrafts12hPerDay = 0
        let aircrafts8hPerDay = 0

        // dá para fazer voos de 12? (capacityTotal >= 2)
        if (capacityTotal >= 2) {
            fligts12hPerDay = 2 // se tiver voos, serão sempre 2 por dia

            // pegar o maior número par
            capacity12h = capacityTotal % 2 === 0 ? capacityTotal : capacityTotal -1

            config12h = this.buildConfiguration(seats, capacity12h, airportDemand, fligts12hPerDay)

            aircrafts12hPerDay = config12h.length
        }

        // dá para fazer voos de 8h? (capacityTotal >= 3)
        if (capacityTotal >= 3) {
            fligts8hPerDay = 3 // se tiver voos de 8h, serão sempre 3 por dia

            // pegar o maior múltiplo de 3
            capacity8h = capacityTotal % 3 === 0 ? capacityTotal : 
                ( capacityTotal -1 ) % 3 === 0 ? capacityTotal -1 : capacityTotal -2

            config8h = this.buildConfiguration(seats, capacity8h, airportDemand, fligts8hPerDay)

            aircrafts8hPerDay = config8h.length
        }

        return this.format({
            aircrafts: aircrafts12hPerDay,
            fligtsPerDay: fligts12hPerDay,
            config: config12h
        },
        {
            aircrafts: aircrafts8hPerDay,
            fligtsPerDay: fligts8hPerDay,
            config: config8h
        })
    }

    private buildConfiguration(seats: number, capacityTotal: number, airportDemand: Demand, fligts8hPerDay: number): Demand[] {
        let unusedDemand: number = seats
        this.unusedDemandCalculation.setFreeSeats(seats)

        this.configurationCalculation.setCapacityTotal(capacityTotal) // eu seto este valor apenas uma vez

        const firstClassConfiguration = this.configurationCalculation.calculate(airportDemand.firstClass)
        unusedDemand =this.unusedDemandCalculation.calculate({seats: firstClassConfiguration, type: SeatCategory.FIRST_CLASS})

        const businessConfiguration = this.configurationCalculation.calculate(airportDemand.business)
        unusedDemand = this.unusedDemandCalculation.calculate({seats: businessConfiguration, type: SeatCategory.BUSINESS})

        const config = []
        for(let index = 0; index < (capacityTotal / fligts8hPerDay); index++) {
            config.push({ economy: unusedDemand, business: businessConfiguration, firstClass: firstClassConfiguration },)
        }

        return config
    }

    private format(dataFor12hConfig: ConfigurationProps, dataFor8hConfig: ConfigurationProps): SuggestedConfig[] {
        return [
            {
                configHours: 12,
                configuration: {
                    aircrafts: dataFor12hConfig.aircrafts,
                    fligtsPerDay: dataFor12hConfig.fligtsPerDay,
                    config: dataFor12hConfig.config
                }
            },
            {
                configHours: 8,
                configuration: {
                    aircrafts: dataFor8hConfig.aircrafts,
                    fligtsPerDay: dataFor8hConfig.fligtsPerDay,
                    config: dataFor8hConfig.config
                }
            }
        ]
    }
}


