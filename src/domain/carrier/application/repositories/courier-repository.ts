import { Courier } from '../../enterprise/entities/courier'

export interface CourierRepository {
  create(courier: Courier): Promise<void>
  findById(id: string): Promise<Courier | null>
  delete(id: string): Promise<void>
}
