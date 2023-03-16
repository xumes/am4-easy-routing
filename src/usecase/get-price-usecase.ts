import { PriceCalculation } from "../domain/calculation/price";
import { GameMode } from "../shared/game-mode";
import { SeatCategory } from "../shared/seat-category";

export type Price = {
    economy: number,
    business: number,
    firstClass: number
}

export class GetPriceUsecase {
    constructor(private readonly priceCalculation: PriceCalculation, private readonly gameMode: GameMode){}

    execute(distance: number): Price {
        const economyPrice = this.priceCalculation.calculate({distance, type: SeatCategory.ECONOMY, gameMode: this.gameMode})
        const businessPrice = this.priceCalculation.calculate({distance, type: SeatCategory.BUSINESS, gameMode: this.gameMode})
        const firstClassPrice = this.priceCalculation.calculate({distance, type: SeatCategory.FIRST_CLASS, gameMode: this.gameMode})

        return {
            economy: economyPrice,
            business: businessPrice,
            firstClass: firstClassPrice
        }
    }
}
