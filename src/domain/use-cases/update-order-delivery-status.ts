import { Order, Status } from '@/domain/entities/order'

interface UpdateOrderDeliveryStatusRequestUseCase {
  order: Order
  status: Status
}

export class UpdateOrderDeliveryStatusUseCase {
  execute({ order, status }: UpdateOrderDeliveryStatusRequestUseCase) {
    order.status = status

    return order
  }
}