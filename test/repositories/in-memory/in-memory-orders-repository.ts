import { PaginationParams } from '@/core/repositories/pagination-params'
import { OrdersRepository } from '@/domain/carrier/application/repositories/orders-repository'
import { Order } from '@/domain/carrier/enterprise/entities/order'

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
    params: PaginationParams,
  ): Promise<Order[]> {
    const { page } = params

    const orders = this.items
      .filter((item) => item.address.includes(address))
      .slice((page - 1) * 10, page * 10)

    return orders
  }

  async fetchOrdersByRecipient(
    recipientId: string,
    params: PaginationParams,
  ): Promise<Order[]> {
    const { page } = params

    const orders = this.items
      .filter((item) => item.recipientId.toString() === recipientId)
      .slice((page - 1) * 10, page * 10)

    return orders
  }

  async save(order: Order): Promise<void> {
    const orderIndex = this.items.findIndex((item) => item.id === order.id)

    this.items[orderIndex] = order
  }

  async delete(orderId: string): Promise<void> {
    const orderIndex = this.items.findIndex(
      (item) => item.id.toString() === orderId,
    )

    this.items.splice(orderIndex, 1)
  }
}
