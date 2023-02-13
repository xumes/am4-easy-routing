import { LoadAircraftUseCase } from "./usecase/loadAircraft";

const listAirplanes = new LoadAircraftUseCase()

listAirplanes.carregaPorFabricante('Embraer').then(lista => {
    console.table(lista)
})