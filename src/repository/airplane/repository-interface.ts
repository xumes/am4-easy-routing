import { AirplaneProps } from "../../domain/airplane/airplane"

export interface AirplaneRepository {
    load(): Promise<AirplaneProps[]>
    loadByManufacturer(manufacturer: string): Promise<AirplaneProps[]>
    loadByName(name: string): Promise<AirplaneProps>
}
