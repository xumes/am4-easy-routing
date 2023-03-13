import axios from 'axios'
import { APIResponse } from './route-demand-types'

export class AirlinemanagerAPI {
    private baseUrl = 'https://www.airlinemanager.com/api'

    constructor(private readonly accessToken: string) {}

    async getRouteDemand(departureICAO: string, range: number, runway: number): Promise<APIResponse> {
        const fields='research'

        // https://www.airlinemanager.com/api?access_token=[YOUR_ACCESS_TOKEN]&fields=research&dep_icao=[ICAO]&min_runway=[NO]&max_distance=[NO]
        const url = `${this.baseUrl}?access_token=${this.accessToken}&fields=${fields}&dep_icao=${departureICAO}&max_distance=${range}&min_runway=${runway}`

        const result = await axios.get(url)
        return result.data
    }
}