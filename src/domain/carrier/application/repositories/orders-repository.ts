import { Order } from '@/domain/carrier/enterprise/entities/order'

export interface OrdersRepository {
  create(order: Order): Promise<void>
}
