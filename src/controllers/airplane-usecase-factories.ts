import { FileAirplaneRepository } from "../repository/airplane/file-airplane-repository";
import { LoadAirplaneByManufacturerUsecase } from "../usecase/load-airplane-by-manufacturer-usecase";
import { LoadAirplaneByNameUsecase } from "../usecase/load-airplane-by-name-usecase";
import { LoadAllAirplanesUsecase } from "../usecase/load-all-airplanes-usecase";
import { LoadUsecase } from "../usecase/load-usecase-inteface";

export class MakeLoadAirplanesUsecase {
    static buildAllAirplanes(connection: any): LoadUsecase{
        const repository = new FileAirplaneRepository(connection)
        return new LoadAllAirplanesUsecase(repository)
    }

    static buildByManufacturer(connection: any): LoadUsecase{
        const repository = new FileAirplaneRepository(connection)
        return new LoadAirplaneByManufacturerUsecase(repository)
    }

    static buildByName(connection: any): LoadUsecase{
        const repository = new FileAirplaneRepository(connection)
        return new LoadAirplaneByNameUsecase(repository)
    }
}
