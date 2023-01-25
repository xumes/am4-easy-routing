import { CapacityCalculation } from "../../../src/domain/calculation/capacity"

describe('Capacity Calculation', () => {
    it('should throw an error when capacity is <=0', () => {
       const demand = 10
       const capacity = -1
       
       const capacityCalculation = new CapacityCalculation()

       expect( () => {
            capacityCalculation.calculate({capacity, demand})
       }).toThrow('Capacity must be positive')
    })

    it('should throw an error when capacity is =0', () => {
        const demand = 10
        const capacity = 0
        
        const capacityCalculation = new CapacityCalculation()
 
        expect( () => {
             capacityCalculation.calculate({capacity, demand})
        }).toThrow('Capacity must be positive')
     })

     it('should throw an error when capacity is not provided', () => {
      const demand = 10
      const capacity = null
      
      const capacityCalculation = new CapacityCalculation()

      expect( () => {
           capacityCalculation.calculate({capacity: capacity as any, demand})
      }).toThrow('Capacity must be positive')
    })

    it('should throw an error when capacity is not provided', () => {
      const demand = 10
      const capacity = undefined
      
      const capacityCalculation = new CapacityCalculation()

      expect( () => {
           capacityCalculation.calculate({capacity: capacity as any, demand})
      }).toThrow('Capacity must be positive')
    })


     it('should return the correct value on succes', () => {
        const demand = 1556
        const capacity = 600

        const capacityCalculation = new CapacityCalculation()

        const result = capacityCalculation.calculate({capacity: capacity as any, demand})


        expect(result).toBe(2)
     })

     it('should return zero when there is no demand', () => {
        const demand = 0
        const capacity = 600

        const capacityCalculation = new CapacityCalculation()

        const result = capacityCalculation.calculate({capacity: capacity as any, demand})

        expect(result).toBe(0)
     })


})