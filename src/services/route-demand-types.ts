export type  RouteDemand = {
    arrival: string,
    icao: string,
    iata: string,
    runway: number,
    market: number,
    economy_class_demand: number,
    business_class_demand: number,
    first_class_demand: number,
    cargo_large_demand: number,
    cargo_heavy_demand: number,
    distance: number
}

export type APIRoute = {
    departure: string,
    data: RouteDemand[]
}

export type APIStatus = {
    request: string,
    requests_remaining: number
}

export type APIResponse = {
    status: APIStatus,
    route: APIRoute
}