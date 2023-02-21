import { Airplane, AirplaneProps } from "../domain/airplane/airplane";

export interface LoadUsecase {
    execute(name?: string): Promise<Airplane | AirplaneProps[]>
}
