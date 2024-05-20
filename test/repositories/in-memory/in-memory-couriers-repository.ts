import { CourierRepository } from '@/domain/carrier/application/repositories/courier-repository'
import { Courier } from '@/domain/carrier/enterprise/entities/courier'

export class InMemoryCouriersRepository implements CourierRepository {
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

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id.toString() === id)

    this.items.splice(index, 1)
  }
}
