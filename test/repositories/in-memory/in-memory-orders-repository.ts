import { PaginationParams } from '@/core/repositories/pagination-params'
import { OrdersRepository } from '@/domain/carrier/application/repositories/orders-repository'
import { Order, Status } from '@/domain/carrier/enterprise/entities/order'

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = []

  async create(order: Order): Promise<void> {
    this.items.push(order)
  }

  async findById(orderId: string): Promise<Order | null> {
    const order = this.items.find((item) => item.id.toString() === orderId)

    if (!order) {
      return null
    }

    return order
  }

  async fetchOrdersByAddress(
    address: string,
    { page = 1 }: PaginationParams,
  ): Promise<Order[]> {
    const orders = this.items
      .filter((item) => item.address.includes(address))
      .slice((page - 1) * 10, page * 10)

    return orders
  }

  async fetchOrdersByRecipient(
    recipientId: string,
    { page = 1 }: PaginationParams,
  ): Promise<Order[]> {
    const orders = this.items
      .filter((item) => item.recipientId.toString() === recipientId)
      .slice((page - 1) * 10, page * 10)

    return orders
  }

  async fetchOrdersByStatus(
    status: Status,
    { page = 1 }: PaginationParams,
  ): Promise<Order[]> {
    const orders = this.items
      .filter((item) => item.status === status)
      .slice((page - 1) * 10, page * 10)

    return orders
  }

  async save(order: Order): Promise<void> {
    const orderIndex = this.items.findIndex((item) => item.id === order.id)

    this.items[orderIndex] = order
  }

  async delete(order: Order): Promise<void> {
    const orderIndex = this.items.findIndex((item) => item.id === order.id)

    this.items.splice(orderIndex, 1)
  }
}
