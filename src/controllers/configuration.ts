import { Request, Response } from "express";
import { AirlinemanagerAPI } from "../services/airlinemanager-api";
import { GameMode } from "../shared/game-mode";
import { getAirplaneByName } from "./airplane";
import * as dotenv from "dotenv";
import { MakeConfigurationUsecase } from "./configuration-usecase-factory";
import {
  Demand,
  SuggestedConfig,
  ResponseConfig,
  AirplaneData,
} from "../usecase/configuration";
import { Airplane } from "../domain/airplane/airplane";
import { APIResponse, RouteDemand } from "../services/route-demand-types";
import { GetPriceUsecase, Price } from "../usecase/get-price-usecase";
import { PriceCalculation } from "../domain/calculation/price";
import { slugify } from "../services/slugify";
import { RedisService } from "../services/redis-service";

dotenv.config();

type configurationProps = {
  airplaneName: string;
  departureICAO: string;
  gameMode: GameMode;
};

export const create = async (req: Request, res: Response) => {
  const configurationProps: configurationProps = req.body;

  // validar os dados
  if (
    !configurationProps.airplaneName ||
    !configurationProps.departureICAO ||
    !configurationProps.gameMode
  ) {
    return res.status(400).json({ message: "Invalid request data" });
  }

  // se eu tiver as informações acima, eu gero o slug
  const slug = createSlug(configurationProps)
  const existingConfiguration = await getExistingConfiguration(slug)
  if (existingConfiguration) {
    res.status(200).json(existingConfiguration)
    return
  }

  // chamar nossa api para pegar dados da aeronave
  let airplane: Airplane;

  try {
    airplane = await getAirplaneByName(configurationProps.airplaneName);
  } catch (e) {
    return res.status(404).json({ message: e });
  }

  const runwayLength = getRunawayLength(airplane, configurationProps.gameMode);

  const { status, route } = await getAirportDemand(
    configurationProps.departureICAO,
    airplane.getRange(),
    runwayLength
  );

  if (status.request !== "success") {
    if (status.description === "Unknown departure airport") {
      return res.status(400).json({ message: status.description });
    }
    return res.status(500).json({ message: "Sorry, server error" });
  }

  const airportConfigurations = route.data.map((routeData): ResponseConfig => {
    const airportDemand = mapAirportDemand(routeData);
    const configuration = getConfigurationFromUsecase(
      airplane.getCapacity(),
      airportDemand
    );
    const price = getPrice(configurationProps.gameMode, airplane.getRange());
    const departure = {
      ICAO: configurationProps.departureICAO,
      airport: route.departure,
    };
    const arrival = {
      ICAO: routeData.icao,
      IATA: routeData.iata,
      airport: routeData.arrival,
    };
    const airplaneData: AirplaneData = {
      manufacturer: airplane.getManufacturer(),
      name: configurationProps.airplaneName,
    };

    return {
      suggestedConfig: configuration,
      price,
      demand: airportDemand,
      airplane: airplaneData,
      departure,
      arrival,
    };
  });

  // grava o resultado no Redis
  await saveConfiguration(slug, airportConfigurations)

  res.json(airportConfigurations);
};

const getRunawayLength = (airplane: Airplane, gameMode: GameMode): number => {
  return gameMode === GameMode.REALISM ? airplane.getRunaway() : 0;
};

const getAirportDemand = async (
  airportICAO: string,
  airplaneRange: number,
  runwayLength: number
): Promise<APIResponse> => {
  //chamar a api do www.airlinemanager.com
  const airlinemanagerApi = new AirlinemanagerAPI(
    process.env.AIRLINE_MANAGER_ACCESS_TOKEN as string
  );

  return await airlinemanagerApi.getRouteDemand(
    airportICAO,
    airplaneRange,
    runwayLength
  );
};

const getConfigurationFromUsecase = (
  airplaneCapacity: number,
  airportDemand: Demand
): SuggestedConfig[] => {
  const configurationUsecase = MakeConfigurationUsecase.build();
  return configurationUsecase.execute(airplaneCapacity, airportDemand);
};

const mapAirportDemand = (routeData: RouteDemand): Demand => {
  return {
    economy: routeData.economy_class_demand,
    business: routeData.business_class_demand,
    firstClass: routeData.first_class_demand,
  };
};

const getPrice = (gameMode: GameMode, distance: number): Price => {
  const priceCalculation = new PriceCalculation();
  const getPriceUsecase = new GetPriceUsecase(priceCalculation, gameMode);

  const price = getPriceUsecase.execute(distance);
  return price;
};

const createSlug = (configurationProps: configurationProps): string => {
  const {gameMode, departureICAO, airplaneName} = configurationProps

  return slugify(`${gameMode}-${departureICAO}-${airplaneName}`)
}

const saveConfiguration = async (slug: string, configurations: ResponseConfig[]): Promise<void> => {
  const TWO_MONTHS = 60 * 60 * 24 * 30.44 * 2;

  const redisService = RedisService.getInstance()
  await redisService.set(slug, JSON.stringify(configurations), TWO_MONTHS)
}

const getExistingConfiguration = async (slug: string): Promise<ResponseConfig[] | null> => {
  const redisService = RedisService.getInstance()
  const configurations = await redisService.get(slug)

  if (!configurations) {
    return null
  }

  return JSON.parse(configurations)
}

