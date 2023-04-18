import { NotFoundError } from "../../shared/not-found-error"

export type AirplaneProps = {
    manufacturer: string,
    aircraft: string,
    capacity: number,
    range: number,
    cost?: number,
    cruiseSpeed?: number,
    runway?: number,
    aCheck?: number,
    maintenanceCheck?: number
}

export class Airplane {
    constructor(private readonly props: AirplaneProps){}

    getRange(): number {
        if (this.props.range === null || this.props.range === undefined) {
            throw new Error('Missing range')
        }

        return this.props.range
    }

    getCapacity(): number {
        if (this.props.capacity === null || this.props.capacity === undefined) {
            throw new Error('Missing capacity')
        }

        return this.props.capacity
    }

    getAircraft(): string {
        if (!this.props.aircraft) {
            throw new NotFoundError("Missing aircraft name")
        }

        return this.props.aircraft
    }

    getManufacturer(): string {
        if (!this.props.manufacturer) {
            throw new Error('Missing manufacturer')
        }

        return this.props.manufacturer
    }

    getRunaway(): number {
        if(!this.props.runway) {
            return 0
        }

        return this.props.runway
    }

    validate(): void {
        this.getAircraft()
        this.getManufacturer()
        this.getCapacity()
        this.getRange()
    }
}
