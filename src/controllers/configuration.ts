import {Request, Response} from 'express'
import { AirlinemanagerAPI } from '../services/airlinemanager-api'
import { GameMode } from '../shared/game-mode'
import { getAirplaneByName } from './airplane'
import * as dotenv from 'dotenv'
import { MakeConfigurationUsecase } from './configuration-usecase-factory'
import { Demand, SuggestedConfig } from '../usecase/configuration'
import { Airplane } from '../domain/airplane/airplane'
import { APIResponse, RouteDemand } from '../services/route-demand-types'

dotenv.config()

type configurationProps = {
    airplaneName: string,
    departureICAO: string,
    gameMode: GameMode
}

export const create = async (req: Request, res: Response) => {
    const configurationProps: configurationProps = req.body

    // validar os dados
    if (!configurationProps.airplaneName || !configurationProps.departureICAO || !configurationProps.gameMode) {
        return res.status(400).json({message: 'Invalid request data'})
    }

    // chamar nossa api para pegar dados da aeronave
    const airplane = await getAirplaneByName(configurationProps.airplaneName)
    
    const runwayLength = getRunawayLength(airplane, configurationProps.gameMode)

    const {status, route} = await getAirportDemand(configurationProps.departureICAO, airplane.getRange(), runwayLength)

    if (status.request !== "success") {
        return res.status(400).json({message: 'Invalid request data'})
    }

    const airportConfigurations = route.data.map((routeData) => {
        const airportDemand = mapAirportDemand(routeData)
        const configuration = getConfigurationFromUsecase(airplane.getCapacity(), airportDemand)

        return configuration
    })

    res.json(airportConfigurations)
}

const getRunawayLength = (airplane: Airplane, gameMode: GameMode): number => {
    return gameMode === GameMode.REALISM ? airplane.getRunaway() : 0
}

const getAirportDemand = async (airportICAO: string, airplaneRange: number, runwayLength: number): Promise<APIResponse> => {
     //chamar a api do www.airlinemanager.com
     const airlinemanagerApi = new AirlinemanagerAPI(process.env.AIRLINE_MANAGER_ACCESS_TOKEN as string)

     return await airlinemanagerApi.getRouteDemand(airportICAO, airplaneRange, runwayLength)
}

const getConfigurationFromUsecase = (airplaneCapacity: number, airportDemand: Demand): SuggestedConfig[] => {
    const configurationUsecase = MakeConfigurationUsecase.build()
    return configurationUsecase.execute(airplaneCapacity, airportDemand)
}

const mapAirportDemand = (routeData: RouteDemand): Demand => {
    return {
        economy: routeData.economy_class_demand,
        business: routeData.business_class_demand,
        firstClass: routeData.first_class_demand
    }
}

// Erro personalizado (criar o erro, capturar no controller e responder com o status code correto)
// Incluir mais informações no retorno
// Gravar no banco de dados
// Ler do banco antes de fazer a chamada