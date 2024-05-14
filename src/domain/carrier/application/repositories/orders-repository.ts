import { Order, Status } from '@/domain/carrier/enterprise/entities/order'

export interface OrdersRepository {
  create(order: Order): Promise<void>
  findById(orderId: string): Promise<Order | null>
  updateStatus(order: Order, status: Status): Promise<Order>
  fetchOrdersByAddress(address: string): Promise<Order[]>
}
