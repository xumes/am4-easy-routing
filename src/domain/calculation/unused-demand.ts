import { SeatCategory } from "../../shared/seat-category";
import { CalculationInterface } from "../interfaces/calculation-interface";

type UnusedProps = {
    seats: number,
    type: SeatCategory
}

export class UnusedDemandCalculation implements CalculationInterface<UnusedProps> {
    freeSeats = 0

    calculate(value: UnusedProps): number {
        let result = 0

        switch(value.type){
            case SeatCategory.FIRST_CLASS: 
                result = this.freeSeats - (value.seats * 3)
                break
            case SeatCategory.BUSINESS:
                result = this.freeSeats - (value.seats * 2)
                break
            default:
                result = value.seats
        }

        this.freeSeats = result
        return this.freeSeats
    }

    setFreeSeats(value: number): void {
        this.freeSeats = value
    }
}