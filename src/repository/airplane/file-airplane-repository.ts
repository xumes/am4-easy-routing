import { AirplaneProps } from "../../domain/airplane/airplane";
import { AirplaneRepository } from "./repository-interface";

export class FileAirplaneRepository implements AirplaneRepository {
    constructor(private readonly file: AirplaneProps[]){}

    async load(): Promise<AirplaneProps[]> {
        return this.file
    }

    async loadByManufacturer(manufacturer: string): Promise<AirplaneProps[]> {
        if(!manufacturer) {
            throw new Error('Manufacturer is required!')
        }

        const found = await this.file.filter((airplane) => {
            return airplane.manufacturer === manufacturer
        })

        if(found.length === 0) {
            throw new Error('Manufacturer not found')
        }

        return found
    }

    async loadByName(name: string): Promise<AirplaneProps> {
        if(!name) {
            throw new Error("Aircraft name is required!")
        }

        const found = await this.file.filter((airplane) => {
            return airplane.aircraft === name
        })

        if (found.length === 0) {
            throw new Error("Aircraft not found")
        }

        return found[0]
    }
}
