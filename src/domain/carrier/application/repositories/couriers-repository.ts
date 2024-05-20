import { PaginationParams } from '@/core/repositories/pagination-params'
import { Courier } from '../../enterprise/entities/courier'

export interface EditCourierProps {
  name: string
}

export interface CouriersRepository {
  create(courier: Courier): Promise<void>
  findById(id: string): Promise<Courier | null>
  findMany(params: PaginationParams): Promise<Courier[]>
  save(courier: Courier): Promise<void>
  delete(id: string): Promise<void>
}
