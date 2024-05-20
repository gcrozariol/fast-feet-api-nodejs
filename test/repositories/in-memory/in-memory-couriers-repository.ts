import { PaginationParams } from '@/core/repositories/pagination-params'
import { CouriersRepository } from '@/domain/carrier/application/repositories/couriers-repository'
import { Courier } from '@/domain/carrier/enterprise/entities/courier'

export class InMemoryCouriersRepository implements CouriersRepository {
  public items: Courier[] = []

  async create(courier: Courier): Promise<void> {
    this.items.push(courier)
  }

  async findById(id: string): Promise<Courier | null> {
    const courier = this.items.find((item) => item.id.toString() === id)

    if (!courier) {
      return null
    }

    return courier
  }

  async findMany(params: PaginationParams): Promise<Courier[]> {
    const { page } = params

    return this.items.slice((page - 1) * 10, page * 10)
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id.toString() === id)

    this.items.splice(index, 1)
  }
}
