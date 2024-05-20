import { Courier } from '../../enterprise/entities/courier'

export interface CourierRepository {
  create(courier: Courier): Promise<void>
}
