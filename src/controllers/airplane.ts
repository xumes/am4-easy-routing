import {Request, Response} from "express"


import pax from "../data/pax.json"
import { MakeLoadAirplanesUsecase } from "./airplane-usecase-factories";
import { Airplane } from "../domain/airplane/airplane";


export const load = async (req: Request, res:Response) => {
  try {
    const loadAllAirplanesFactory = MakeLoadAirplanesUsecase.buildAllAirplanes(pax)
    const airplanes = await loadAllAirplanesFactory.execute()

    res.json(airplanes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const loadByManufacturer = async (req: Request, res:Response) => {
  try {
    const loadAllAirplanesFactory = MakeLoadAirplanesUsecase.buildByManufacturer(pax)
    const airplanes = await loadAllAirplanesFactory.execute(req.params.manufacturer);
    
    res.json(airplanes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const loadByName = async (req: Request, res:Response) => {
  console.log("Headers", req.headers)
  try {
    const airplane = await getAirplaneByName(req.params.name)

    res.json(airplane.getAircraft());
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const getAirplaneByName = async (name: string): Promise<Airplane> => {
  const loadAirplaneFactory = MakeLoadAirplanesUsecase.buildByName(pax)
  return await loadAirplaneFactory.execute(name) as Airplane;
}