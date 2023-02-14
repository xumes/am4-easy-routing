import { Airplane } from "../domain/airplane/airplane";
import { AirplaneRepository } from "../repository/airplane/repository-interface";
import { LoadUsecase } from "./load-usecase-inteface";

export class LoadAirplaneByNameUsecase implements LoadUsecase {
    constructor(private readonly repository: AirplaneRepository) {}

    async execute(name: string): Promise<Airplane> {
        const result = await this.repository.loadByName(name)

        const airplane = new Airplane(result)
        airplane.validate()

        return airplane
    }
}
