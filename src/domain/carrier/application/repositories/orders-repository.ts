import { Order, Status } from '@/domain/carrier/enterprise/entities/order'

export interface EditOrderProps {
  status: Status
}

export interface OrdersRepository {
  create(order: Order): Promise<void>
  save(order: Order): Promise<void>
  findById(orderId: string): Promise<Order | null>
  fetchOrdersByAddress(address: string): Promise<Order[]>
}
