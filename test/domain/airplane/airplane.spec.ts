import { Airplane, AirplaneProps } from "../../../src/domain/airplane/airplane"

const makeAirplane = ({aircraft='any_aircraft', manufacturer='any_manufacturer', capacity=10, range=1000}): Airplane => {
    return new Airplane({
        aircraft,
        manufacturer,
        capacity,
        range
    })
}

describe('Airplane', () => {
    it('should throw an error when an airplane has no range information', () => {
        const airplane = makeAirplane({range: null as any})

        expect(() => {
            airplane.getRange()
        }).toThrow(new Error('Missing range'))
    })

    it('should return the range on success', () => {
        const airplane = makeAirplane({})
        const range = airplane.getRange()

        expect(range).toBe(1000)
    })

    it('should throw an error when an airplane has no capacity information', () => {
        const airplane = makeAirplane({capacity: null as any})

        expect(() => {
            airplane.getCapacity()
        }).toThrow(new Error('Missing capacity'))
    })

    it('should return the capacity on success', () => {
        const airplane = makeAirplane({})

        const capacity = airplane.getCapacity()

        expect(capacity).toBe(10)
    })

    it('should throw an error when an airplane has no name information', () => {
        const airplane = makeAirplane({aircraft: null as any})

        expect(() => {
            airplane.getAircraft()
        }).toThrow(new Error('Missing aircraft name'))
    })

    it('should return the aircraft name on success', () => {
        const airplane = makeAirplane({})

        const name = airplane.getAircraft()

        expect(name).toBe("any_aircraft")
    })

    it('should throw an error when manufacturer information is not provided', () => {
        const airplane = makeAirplane({manufacturer: ''})

        expect(() => {
            airplane.getManufacturer()
        }).toThrow(new Error ('Missing manufacturer'))
    })

    it('should throw an error when manufacturer information is null', () => {
        const airplane = makeAirplane({manufacturer: null as any})

        expect(() => {
            airplane.getManufacturer()
        }).toThrow(new Error ('Missing manufacturer'))
    })

    it('should return the manufacturer name on success', () => {
        const props: AirplaneProps = {
            aircraft: 'any_aircraft',
            manufacturer: 'any_manufacturer',
            capacity: 10,
            range: 1000
        }

        const airplane = new Airplane(props)
        const manufacturer = airplane.getManufacturer()

        expect(manufacturer).toBe('any_manufacturer')
    })

    it('should throw an error when range is empty (on validate)', () =>{
        const airplane = makeAirplane({aircraft: '', manufacturer: '', range: null as any, capacity: null as any})

        expect(() => {
            airplane.validate()
        }).toThrow(new Error('Missing aircraft name'))
    })
})
