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

        if (value.seats <= 0 || this.freeSeats <= 0) {
            return result
        }

        let seatsToConsume = 0
        
        switch(value.type){
            case SeatCategory.FIRST_CLASS:
                seatsToConsume = (value.seats * 3)
                if (this.freeSeats <= seatsToConsume) {
                    result = this.freeSeats
                    this.freeSeats = 0

                    return result
                }

                result = this.freeSeats - seatsToConsume
                this.freeSeats = result

                break
            case SeatCategory.BUSINESS:
                seatsToConsume = (value.seats * 2)
                if (this.freeSeats <= seatsToConsume) {
                    result = this.freeSeats
                    this.freeSeats = 0

                    return result
                }

                result = this.freeSeats - seatsToConsume
                this.freeSeats = result

                break
            default:
                seatsToConsume = value.seats
                if (this.freeSeats <= seatsToConsume) {
                    result = this.freeSeats
                    this.freeSeats = 0

                    return result
                }

                result = (this.freeSeats - seatsToConsume ) > 0 ? this.freeSeats - seatsToConsume : 0
                this.freeSeats = result
        }

        return result
    }

    setFreeSeats(value: number): void {
        this.freeSeats = value
    }
}