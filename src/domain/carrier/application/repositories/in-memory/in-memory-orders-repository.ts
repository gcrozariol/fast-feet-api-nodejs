import { OrdersRepository } from '@/domain/carrier/application/repositories/orders-repository'
import { Order, Status } from '@/domain/carrier/enterprise/entities/order'

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = []

  async create(order: Order): Promise<void> {
    this.items.push(order)
  }

  async findById(orderId: string): Promise<Order | null> {
    return this.items.find((item) => item.id.toString() === orderId) ?? null
  }

  async updateStatus(order: Order, status: Status): Promise<Order> {
    order.status = status
    return order
  }
}
