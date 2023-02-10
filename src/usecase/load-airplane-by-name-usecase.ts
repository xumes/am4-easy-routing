import { Airplane } from "../domain/airplane/airplane";
import { AirplaneRepository } from "../repository/airplane/repository-interface";

export class LoadAirplaneByNameUsecase {
    constructor(private readonly repository: AirplaneRepository) {}

    async execute(airplaneName: string): Promise<Airplane> {
        const result = await this.repository.loadByName(airplaneName)

        const airplane = new Airplane(result)
        airplane.validate()

        return airplane
    }
}