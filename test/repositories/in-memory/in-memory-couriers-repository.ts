import { CourierRepository } from '@/domain/carrier/application/repositories/courier-repository'
import { Courier } from '@/domain/carrier/enterprise/entities/courier'

export class InMemoryCouriersRepository implements CourierRepository {
  public items: Courier[] = []

  async create(courier: Courier): Promise<void> {
    this.items.push(courier)
  }
}
