import { CapacityCalculation } from "../../../src/domain/calculation/capacity"

describe('Capacity Calculation', () => {
    it('should throw an error when capacity is <=0', () => {
       const demand = 10
       const capacity = -1
       
       const capacityCalculation = new CapacityCalculation()

       expect( () => {
            capacityCalculation.calculate(demand, capacity)
       }).toThrow('Capacity must be positive')
    })

    it('should throw an error when capacity is =0', () => {
        const demand = 10
        const capacity = 0
        
        const capacityCalculation = new CapacityCalculation()
 
        expect( () => {
             capacityCalculation.calculate(demand, capacity)
        }).toThrow('Capacity must be positive')
     })

     it('should return the correct value on succes', () => {
        const demand = 1556
        const capacity = 600

        const capacityCalculation = new CapacityCalculation()

        const result = capacityCalculation.calculate(demand, capacity)

        const expectedResult = (1556/600)

        expect(result).toBe(expectedResult)
     })

     it('should return zero when there is no demand', () => {
        const demand = 0
        const capacity = 600

        const capacityCalculation = new CapacityCalculation()

        const result = capacityCalculation.calculate(demand, capacity)

        expect(result).toBe(0)
     })
})