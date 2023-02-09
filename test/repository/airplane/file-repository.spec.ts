import { AirplaneProps } from "../../../src/domain/airplane/airplane"
import { FileAirplaneRepository } from "../../../src/repository/airplane/file-airplane-repository"

const mockData: AirplaneProps[] = [
    {
        "manufacturer": "Manufacturer A",
        "aircraft": "Airplane A",
        "capacity": 1,
        "range": 10,
    },
    {
        "manufacturer": "Manufacturer A",
        "aircraft": "Airplane B",
        "capacity": 2,
        "range": 20,
    },
    {
        "manufacturer": "Manufacturer B",
        "aircraft": "Airplane C",
        "capacity": 3,
        "range": 30,
    }
]

describe('File Airplane Repository', () => {
    describe('load', () => {
        it('should throw an error when repository throws', () => {
            const repository = new FileAirplaneRepository(mockData)
            jest.spyOn(repository, 'load').mockImplementation(() => { throw new Error("any_error") })

            expect(() => {
                repository.load()
            }).toThrow(new Error('any_error'))
        })

        it('should return empty when there is no data in the file', async () => {
            const repository = new FileAirplaneRepository([])
            const result = await repository.load()

            expect(result).toStrictEqual([])
        })

        it('should return data on success', async () => {
            const repository = new FileAirplaneRepository(mockData)
            const result = await repository.load()

            expect(result).toStrictEqual(mockData)
        })
    })

    describe('loadByManufacturer', () => {
        it('it should throw an error when manufacturer is not provided', () => {
            const repository = new FileAirplaneRepository(mockData)

            const promise = repository.loadByManufacturer(null as any)

            expect(promise).rejects.toThrow(new Error('Manufacturer is required!'))
        })

        it('should return not found when there is no data for the provided manufacturer', () => {
            const repository = new FileAirplaneRepository(mockData)
            const promise = repository.loadByManufacturer('Manufacturer X')

            expect(promise).rejects.toThrow(new Error('Manufacturer not found'))
        })

        it('should return data on success',async () => {
            const repository = new FileAirplaneRepository(mockData)
            const result = await repository.loadByManufacturer('Manufacturer A')

            expect(result.length).toBe(2)
            expect(result[0].aircraft).toBe("Airplane A")
            expect(result[0].range).toBe(10)
            expect(result[0].capacity).toBe(1)
            expect(result[1].aircraft).toBe("Airplane B")

            const result2 = await repository.loadByManufacturer('Manufacturer B')
            
            expect(result2.length).toBe(1)
            expect(result2[0].aircraft).toBe("Airplane C")
        })
    })

    describe('loadByName', () => {
        it('it should throw an error when name is not provided', () => {
            const repository = new FileAirplaneRepository(mockData)

            const promise = repository.loadByName(null as any)

            expect(promise).rejects.toThrow(new Error('Aircraft name is required!'))
        })

        it('should return not found when there is no data for the provided name', () => {
            const repository = new FileAirplaneRepository(mockData)
            const promise = repository.loadByName('Air Xumes')

            expect(promise).rejects.toThrow(new Error('Aircraft not found'))
        })

        it('should return data on success', async () => {
            const repository = new FileAirplaneRepository(mockData)
            const result = await repository.loadByName('Airplane B')

            expect(result.manufacturer).toBe("Manufacturer A")
            expect(result.range).toBe(20)
            expect(result.capacity).toBe(2)

            const result2 = await repository.loadByName('Airplane C')

            expect(result2.manufacturer).toBe("Manufacturer B")
            expect(result2.range).toBe(30)
            expect(result2.capacity).toBe(3)
        })
    })
})