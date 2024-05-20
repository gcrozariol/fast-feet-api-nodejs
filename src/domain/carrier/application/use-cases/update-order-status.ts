import { Order, Status } from '@/domain/carrier/enterprise/entities/order'
import { InMemoryOrdersRepository } from '@test/repositories/in-memory/in-memory-orders-repository'

interface UpdateOrderStatusUseCaseRequest {
  orderId: string
  status: Status
}

interface UpdateOrderStatusUseCaseResponse {
  order: Order
}

export class UpdateOrderStatusUseCase {
  constructor(private orderRepository: InMemoryOrdersRepository) {}

  async execute({
    orderId,
    status,
  }: UpdateOrderStatusUseCaseRequest): Promise<UpdateOrderStatusUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      throw new Error('Order not found')
    }

    order.status = status

    await this.orderRepository.save(order)

    return { order }
  }
}
