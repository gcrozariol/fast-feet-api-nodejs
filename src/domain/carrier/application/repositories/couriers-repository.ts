import { PaginationParams } from '@/core/repositories/pagination-params'
import { Courier } from '../../enterprise/entities/courier'

export interface CouriersRepository {
  create(courier: Courier): Promise<void>
  findById(id: string): Promise<Courier | null>
  delete(id: string): Promise<void>
  findMany(params: PaginationParams): Promise<Courier[]>
}
