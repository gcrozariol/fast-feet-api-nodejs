import { Order } from '@/domain/entities/order'

export interface OrdersRepository {
  create(order: Order): Promise<void>
}
