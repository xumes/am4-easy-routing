import { AirplaneProps } from "../domain/airplane/airplane";
import { AirplaneRepository } from "../repository/airplane/repository-interface";

export class LoadAllAirplanesUsecase {
    constructor(private readonly repository: AirplaneRepository){}

    async execute(): Promise<AirplaneProps[]>{
        return await this.repository.load()
    }
}
