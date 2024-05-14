import { OrdersRepository } from '@/domain/carrier/application/repositories/orders-repository'
import { Order } from '@/domain/carrier/enterprise/entities/order'

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = []

  async create(order: Order): Promise<void> {
    this.items.push(order)
  }

  async findById(orderId: string): Promise<Order | null> {
    return this.items.find((item) => item.id.toString() === orderId) ?? null
  }

  async fetchOrdersByAddress(address: string): Promise<Order[]> {
    const orders = this.items.filter((item) => item.address.includes(address))

    return orders
  }

  async save(order: Order): Promise<void> {
    const orderIndex = this.items.findIndex((item) => item.id === order.id)

    this.items[orderIndex] = order
  }
}
