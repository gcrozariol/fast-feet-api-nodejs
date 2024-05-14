import { Order, Status } from '@/domain/carrier/enterprise/entities/order'
import { InMemoryOrdersRepository } from '../repositories/in-memory/in-memory-orders-repository'

interface UpdateOrderDeliveryStatusUseCaseRequest {
  orderId: string
  status: Status
}

interface UpdateOrderDeliveryStatusUseCaseResponse {
  order: Order
}

export class UpdateOrderDeliveryStatusUseCase {
  constructor(private orderRepository: InMemoryOrdersRepository) {}

  async execute({
    orderId,
    status,
  }: UpdateOrderDeliveryStatusUseCaseRequest): Promise<UpdateOrderDeliveryStatusUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      throw new Error('Order not found')
    }

    const updatedOrder = await this.orderRepository.updateStatus(order, status)

    return { order: updatedOrder }
  }
}
