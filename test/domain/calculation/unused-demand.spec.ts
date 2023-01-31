import { UnusedDemandCalculation } from "../../../src/domain/calculation/unused-demand"
import { SeatCategory } from "../../../src/shared/seat-category"

describe('Unused Demand Calculation', () => {
    it('it should calculate the unused seats on success', () => {
        const initialFreeSeats = 100
        const seats = 20
        const type = SeatCategory.ECONOMY

        const unusedDemandCalculation = new UnusedDemandCalculation()
        unusedDemandCalculation.setFreeSeats(initialFreeSeats)

        const result = unusedDemandCalculation.calculate({seats, type})

        expect(result).toBe(80)
    })

    it('it should calculate business type the unused seats on success', () => {
        const initialFreeSeats = 100
        const seats = 20
        const type = SeatCategory.BUSINESS

        const unusedDemandCalculation = new UnusedDemandCalculation()
        unusedDemandCalculation.setFreeSeats(initialFreeSeats)
        const result = unusedDemandCalculation.calculate({seats, type})

        expect(result).toBe(60)
    })

    it('it should calculate first class type the unused seats on success', () => {
        const initialFreeSeats = 100
        const seats = 20
        const type = SeatCategory.FIRST_CLASS

        const unusedDemandCalculation = new UnusedDemandCalculation()
        unusedDemandCalculation.setFreeSeats(initialFreeSeats)
        const result = unusedDemandCalculation.calculate({seats, type})

        expect(result).toBe(40)
    })

    it('it should return 1 when there is only one available seat', () => {
        const initialFreeSeats = 51
        const seats = 10

        const unusedDemandCalculation = new UnusedDemandCalculation()
        unusedDemandCalculation.setFreeSeats(initialFreeSeats)
        unusedDemandCalculation.calculate({seats, type: SeatCategory.FIRST_CLASS})

        const result = unusedDemandCalculation.calculate({seats, type: SeatCategory.BUSINESS})

        expect(result).toBe(1)
    })
})

