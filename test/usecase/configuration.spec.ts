import { CapacityCalculation } from "../../src/domain/calculation/capacity"
import { ConfigurationCalculation } from "../../src/domain/calculation/configuration"
import { DemandCalculation } from "../../src/domain/calculation/demand"
import { UnusedDemandCalculation } from "../../src/domain/calculation/unused-demand"
import { ConfigurationUsecase } from "../../src/usecase/configuration"

describe('Configuration Usecase', () => {
    it('should return the aircraft configuration needed to consume all demand in an airport', () => {
        const seats = 600
        const economy = 548
        const business = 428
        const firstClass = 71

        const capacityCalculation = new CapacityCalculation()
        const demandCalculation = new DemandCalculation()
        const configurationCalculation = new ConfigurationCalculation()
        const unusedDemandCalculation = new UnusedDemandCalculation()

        const configurationUsecase = new ConfigurationUsecase(capacityCalculation, demandCalculation, configurationCalculation, unusedDemandCalculation)
        const result = configurationUsecase.execute(seats, {economy, business, firstClass})

        expect(result).toStrictEqual([
            { 
                configHours: 12,
                configuration: {
                    aircrafts: 1,
                    fligtsPerDay: 2,
                    config: [
                        { economy: 67, business: 214, firstClass: 35},
                    ]
                }
            },
            {
              configHours: 8,
              configuration: {
                aircrafts: 0,
                config: [],
                fligtsPerDay: 0,
              },
            }
        ])
    })

    it('should return the aircraft configuration needed to consume all demand in an airport', () => {
        const seats = 300
        const economy = 548
        const business = 428
        const firstClass = 71

        const capacityCalculation = new CapacityCalculation()
        const demandCalculation = new DemandCalculation()
        const configurationCalculation = new ConfigurationCalculation()
        const unusedDemandCalculation = new UnusedDemandCalculation()

        const configurationUsecase = new ConfigurationUsecase(capacityCalculation, demandCalculation, configurationCalculation, unusedDemandCalculation)
        const result = configurationUsecase.execute(seats, {economy, business, firstClass})

        expect(result).toStrictEqual([
            { 
                configHours: 12,
                configuration: {
                    aircrafts: 2,
                    fligtsPerDay: 2,
                    config: [
                        { economy: 35, business: 107, firstClass: 17},
                        { economy: 35, business: 107, firstClass: 17},
                    ]
                }
            },
            {
              configHours: 8,
              configuration: {
                aircrafts: 1,
                config: [
                    { economy: 231, business: 142, firstClass: 23},
                ],
                fligtsPerDay: 3,
              },
            }
        ])
    })
})
