import { DemandCalculation } from "../../../src/domain/calculation/demand"

describe('Demand calculation', () => {
    it('should throw an error when economy demand is negative', () => {
        //Arrange
        const economicDemand = -1
        const businessDemand = 1
        const firstClassDemand = 1

        const demandCalculation = new DemandCalculation()

        expect(() => {
            demandCalculation.calculate(economicDemand, businessDemand, firstClassDemand)
        }).toThrow('Demand cannot be negative')
    })

    it('should throw an error when business demand is negative', () => {
        //Arrange
        const economicDemand = 1
        const businessDemand = -1
        const firstClassDemand = 1

        const demandCalculation = new DemandCalculation()

        expect(() => {
            demandCalculation.calculate(economicDemand, businessDemand, firstClassDemand)
        }).toThrow('Demand cannot be negative')
    })

    it('should throw an error when first class demand is negative', () => {
        //Arrange
        const economicDemand = 1
        const businessDemand = 1
        const firstClassDemand = -1

        const demandCalculation = new DemandCalculation()

        expect(() => {
            demandCalculation.calculate(economicDemand, businessDemand, firstClassDemand)
        }).toThrow('Demand cannot be negative')
    })

    it('should return a result when all demand data is provided', () => {
        const economicDemand = 2
        const businessDemand = 2
        const firstClassDemand = 2

        const demandCalculation = new DemandCalculation()

        const demand = demandCalculation.calculate(economicDemand, businessDemand, firstClassDemand)

        expect(demand).toBe(12)
    })

    it('should return a result when all demand data is provided', () => {
        const economicDemand = 3
        const businessDemand = 3
        const firstClassDemand = 3

        const demandCalculation = new DemandCalculation()

        const demand = demandCalculation.calculate(economicDemand, businessDemand, firstClassDemand)

        expect(demand).toBe(18)
    })

    it('should return 0 when there is no demand', () => {
        const economicDemand = 0
        const businessDemand = 0
        const firstClassDemand = 0

        const demandCalculation = new DemandCalculation()

        const demand = demandCalculation.calculate(economicDemand, businessDemand, firstClassDemand)

        expect(demand).toBe(0)
    })

    it('should return 1 when there only 1 economic demand', () => {
        const economicDemand = 1
        const businessDemand = 0
        const firstClassDemand = 0

        const demandCalculation = new DemandCalculation()

        const demand = demandCalculation.calculate(economicDemand, businessDemand, firstClassDemand)

        expect(demand).toBe(1)
    })

    it('should return 2 when there only 1 business demand', () => {
        const economicDemand = 0
        const businessDemand = 1
        const firstClassDemand = 0

        const demandCalculation = new DemandCalculation()

        const demand = demandCalculation.calculate(economicDemand, businessDemand, firstClassDemand)

        expect(demand).toBe(2)
    })

    it('should return 3 when there only 1 first class demand', () => {
        const economicDemand = 0
        const businessDemand = 0
        const firstClassDemand = 1

        const demandCalculation = new DemandCalculation()

        const demand = demandCalculation.calculate(economicDemand, businessDemand, firstClassDemand)

        expect(demand).toBe(3)
    })
})