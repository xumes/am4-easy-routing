import { CapacityCalculation } from "../../src/domain/calculation/capacity"
import { DemandCalculation } from "../../src/domain/calculation/demand"
import { ConfigurationUsecase } from "../../src/usecase/configuration"

describe('Configuration Usecase', () => {
    it('should return the aircraft configuration needed to consume all demand in an airport', () => {
        const seats = 600
        const economy = 548
        const business = 428
        const firstClass = 71

        const capacityCalculation = new CapacityCalculation()
        const demandCalculation = new DemandCalculation()

        const configurationUsecase = new ConfigurationUsecase(capacityCalculation, demandCalculation)
        const result = configurationUsecase.execute(seats, {economy, business, firstClass})

        expect(result).toEqual({
            aircrafts: 1,
            fligtsPerDay: 2,
            config: [
                { economy: 67, business: 214, firstClass: 35},
                { economy: 67, business: 214, firstClass: 35}
            ]
        })
    })
})