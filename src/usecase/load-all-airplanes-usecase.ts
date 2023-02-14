import { AirplaneProps } from "../domain/airplane/airplane";
import { AirplaneRepository } from "../repository/airplane/repository-interface";
import { LoadUsecase } from "./load-usecase-inteface";

export class LoadAllAirplanesUsecase implements LoadUsecase {
    constructor(private readonly repository: AirplaneRepository){}

    async execute(): Promise<AirplaneProps[]>{
        return await this.repository.load()
    }
}
