import { PriceCalculation } from "../../../src/domain/calculation/price"
import { GameMode } from "../../../src/shared/game-mode"
import { SeatCategory } from "../../../src/shared/seat-category"

describe('Price calculation', () => {
    it('should return an error when no GameMode is provided', () => {
        const dataToTest = [
            {gameMode: '', distance: 10, type: SeatCategory.ECONOMY},
            {gameMode: null, distance: 10, type: SeatCategory.BUSINESS},
            {gameMode: undefined, distance: 10, type: SeatCategory.FIRST_CLASS},
        ]

        const priceCalculation = new PriceCalculation()

        expect(() => {
            dataToTest.forEach(item => {
                priceCalculation.calculate({gameMode: item.gameMode as any, distance: item.distance, type: item.type})
            })
        }).toThrow(new Error('GameMode is required'))
    })

    it('should return an error when no seat category type is provided', () => {
        const dataToTest = [
            {gameMode: GameMode.EASY, distance: 10, type: ''},
            {gameMode: GameMode.EASY, distance: 10, type: null},
            {gameMode: GameMode.REALISM, distance: 10, type: undefined},
        ]

        const priceCalculation = new PriceCalculation()

        expect(() => {
            dataToTest.forEach(item => {
                priceCalculation.calculate({gameMode: item.gameMode, distance: item.distance, type: item.type as any})
            })
        }).toThrow(new Error('Seat Type is required'))
    })

    it('should return an error when no seat category type is provided', () => {
        const dataToTest = [
            {gameMode: GameMode.EASY, distance: null, type: SeatCategory.ECONOMY},
            {gameMode: GameMode.EASY, distance: -1, type: SeatCategory.ECONOMY},
            {gameMode: GameMode.REALISM, distance: undefined, type: SeatCategory.ECONOMY},
        ]

        const priceCalculation = new PriceCalculation()

        expect(() => {
            dataToTest.forEach(item => {
                priceCalculation.calculate({gameMode: item.gameMode, distance: item.distance as any, type: item.type})
            })
        }).toThrow(new Error('Distance must be positive'))
    })

    it('should return the price when correct values are provided', () => {
        const dataToTest = [
            {gameMode: GameMode.EASY, distance: 10, type: SeatCategory.ECONOMY, expectedResult: 174.006},
            {gameMode: GameMode.EASY, distance: 10, type: SeatCategory.BUSINESS, expectedResult: 568.006},
            {gameMode: GameMode.EASY, distance: 10, type: SeatCategory.FIRST_CLASS, expectedResult: 1212.006},
            {gameMode: GameMode.REALISM, distance: 10, type: SeatCategory.ECONOMY, expectedResult: 153.006},
            {gameMode: GameMode.REALISM, distance: 10, type: SeatCategory.BUSINESS, expectedResult: 506.006},
            {gameMode: GameMode.REALISM, distance: 10, type: SeatCategory.FIRST_CLASS, expectedResult: 1009.006},
            {gameMode: GameMode.EASY, distance: 0, type: SeatCategory.ECONOMY, expectedResult: 170},
            {gameMode: GameMode.EASY, distance: 0, type: SeatCategory.BUSINESS, expectedResult: 560},
            {gameMode: GameMode.EASY, distance: 0, type: SeatCategory.FIRST_CLASS, expectedResult: 1200},
        ]

        const priceCalculation = new PriceCalculation()
        
        dataToTest.forEach(item => {
            const result = priceCalculation.calculate({gameMode: item.gameMode, distance: item.distance, type: item.type})

            expect(result).toBe(item.expectedResult)
        });
    })
})