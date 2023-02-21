import { Pool } from "pg";
import { AirplaneProps } from "../../domain/airplane/airplane";

export class AirplaneRepository implements AirplaneRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async load(): Promise<AirplaneProps[]> {
    const client = await this.pool.connect();
    try {
      const result = await client.query("SELECT * FROM airplanes");
      return result.rows as AirplaneProps[];
    } finally {
      client.release();
    }
  }

  async loadByManufacturer(manufacturer: string): Promise<AirplaneProps[]> {
    const client = await this.pool.connect();
    try {
      const result = await client.query("SELECT * FROM airplanes WHERE manufacturer = $1", [manufacturer]);
      return result.rows as AirplaneProps[];
    } finally {
      client.release();
    }
  }

  async loadByName(name: string): Promise<AirplaneProps> {
    const client = await this.pool.connect();
    try {
      const result = await client.query("SELECT * FROM airplanes WHERE name = $1", [name]);
      return result.rows[0] as AirplaneProps;
    } finally {
      client.release();
    }
  }
}
