import {Request, Response} from "express"
import pax from "../data/pax.json"
import { MakeLoadAirplanesUsecase } from "./airplane-usecase-factories";
import { Airplane } from "../domain/airplane/airplane";
import { NotFoundError } from "../shared/not-found-error";

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
    if (err instanceof NotFoundError) {
      res.status(404).json({message: err.message});
      return
    }
    res.status(500).json({message: "Sorry, server error"});
  }
};

export const loadByName = async (req: Request, res:Response) => {
  try {
    const airplane = await getAirplaneByName(req.params.name)
    res.json(airplane?.getAircraft());
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).json({message: err.message});
      return
    }
    res.status(500).send("Internal Server Error");
  }
};

export const getAirplaneByName = async (name: string): Promise<Airplane> => {
  const loadAirplaneFactory = MakeLoadAirplanesUsecase.buildByName(pax)
  return await loadAirplaneFactory.execute(name) as Airplane;
}