import {Request, Response} from 'express'
import { AirlinemanagerAPI } from '../services/airlinemanager-api'
import { GameMode } from '../shared/game-mode'
import { getAirplaneByName } from './airplane'
import * as dotenv from 'dotenv'
import { MakeConfigurationUsecase } from './configuration-usecase-factory'
import { Demand } from '../usecase/configuration'

dotenv.config()

type input = {
    airplaneName: string,
    departureICAO: string,
    gameMode: GameMode
}

export const create = async (req: Request, res: Response) => {
    const configurationProps: input = req.body

    // validar os dados
    if (!configurationProps.airplaneName || !configurationProps.departureICAO || !configurationProps.gameMode) {
        throw new Error('Invalid request data')
        res.send('Invalid data')
    }

    // chamar nossa api para pegar dados da aeronave
    const airplane = await getAirplaneByName(configurationProps.airplaneName)
    
    let runway = 0
    if (configurationProps.gameMode === GameMode.REALISM) {
        runway = airplane.getRunaway()
    }

    //chamar a api do www.airlinemanager.com
    const airlinemanagerApi = new AirlinemanagerAPI(process.env.AIRLINE_MANAGER_ACCESS_TOKEN as string)

    const result = await airlinemanagerApi.getRouteDemand(configurationProps.departureICAO, airplane.getRange(), runway)

    if (result.status.request !== "success") {
        res.status(400).send("Erro")
    }

    const airportDemand: Demand = {
        economy: result.route.data[0].economy_class_demand,
        business: result.route.data[0].business_class_demand,
        firstClass: result.route.data[0].first_class_demand
    }

    const configurationUsecase = MakeConfigurationUsecase.build()

    const configuration = configurationUsecase.execute(airplane.getCapacity(), airportDemand)

    res.json(configuration)
}