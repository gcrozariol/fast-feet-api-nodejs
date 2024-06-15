import { PaginationParams } from '@/core/repositories/pagination-params'
import { Order, Status } from '@/domain/carrier/enterprise/entities/order'

export interface EditOrderProps {
  status: Status
}

export interface OrdersRepository {
  create(order: Order): Promise<void>
  findById(orderId: string): Promise<Order | null>
  fetchOrdersByAddress(
    address: string,
    params: PaginationParams,
  ): Promise<Order[]>
  fetchOrdersByRecipient(
    recipientId: string,
    params: PaginationParams,
  ): Promise<Order[]>
  fetchOrdersByStatus(
    status: Status,
    params: PaginationParams,
  ): Promise<Order[]>
  save(order: Order): Promise<void>
  delete(order: Order): Promise<void>
}
