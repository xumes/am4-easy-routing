import { ConfigurationCalculation } from "../../../src/domain/calculation/configuration"

describe('Configuration Calculation', () => {
    it('should return the demand when total capacity is 0', () => {
        const demand = 10
        const capacityTotal = 0

        const configurationCalculation = new ConfigurationCalculation()
        configurationCalculation.setCapacityTotal(capacityTotal)
        const result = configurationCalculation.calculate(demand)

        expect(result).toBe(demand)
    })

    it('should return the demand when total capacity is not provided', () => {
        const demand = 10
        const capacityTotal = null

        const configurationCalculation = new ConfigurationCalculation()
        configurationCalculation.setCapacityTotal(capacityTotal as any)
        const result = configurationCalculation.calculate(demand)

        expect(result).toBe(demand)
    })

    it('should return the demand when total capacity is not provided', () => {
        const demand = 10

        const configurationCalculation = new ConfigurationCalculation()
        const result = configurationCalculation.calculate(demand)

        expect(result).toBe(demand)
    })

    it('should return the correct value when parameters are provided', () => {
        const demand = 10
        const capacityTotal = 5

        const configurationCalculation = new ConfigurationCalculation()
        configurationCalculation.setCapacityTotal(capacityTotal)
        const result = configurationCalculation.calculate(demand)

        expect(result).toBe(2)
    })

    it('should round down the return when parameters are odd', () => {
        const demand = 13
        const capacityTotal = 5

        const configurationCalculation = new ConfigurationCalculation()
        configurationCalculation.setCapacityTotal(capacityTotal)
        const result = configurationCalculation.calculate(demand)

        expect(result).toBe(2)
    })
})