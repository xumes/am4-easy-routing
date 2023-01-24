import { GameMode } from "../../shared/game-mode"
import { SeatCategory } from "../../shared/seat-category"
import { CalculationInterface } from "../interfaces/calculation-interface"

type PriceProps = {
    gameMode: GameMode,
    distance: number,
    type: SeatCategory
}

export class PriceCalculation implements CalculationInterface<PriceProps> {
    calculate(value: PriceProps): number {
        const {gameMode, distance, type} = value

        let result: number

        if(!gameMode) {
            throw new Error('GameMode is required')
        }

        if(!type) {
            throw new Error('Seat Type is required')
        }

        if(distance < 0 || distance === null || distance === undefined) {
            throw new Error('Distance must be positive')
        }

        if (gameMode === GameMode.EASY) {
            result = this.calculateEasyMode(distance, type)
        } else {
            result = this.calculateRealismMode(distance, type)
        }

        return result 
    }

    private calculateEasyMode(distance: number, type: SeatCategory): number {
        if (type === SeatCategory.ECONOMY) {
            return (0.4006 * distance + 170)
        }

        if (type === SeatCategory.FIRST_CLASS) {
            return (1.2006 * distance + 1200)
        }

        return (0.8006 * distance + 560)
    }

    private calculateRealismMode(distance: number, type: SeatCategory): number {
        if (type === SeatCategory.ECONOMY) {
            return (0.3006 * distance + 150)
        }

        if (type === SeatCategory.FIRST_CLASS) {
            return (0.9006 * distance + 1000)
        }

        return (0.6006 * distance + 500)
    }

}

