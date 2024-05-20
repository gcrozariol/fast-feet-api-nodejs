import { Order, Status } from '@/domain/carrier/enterprise/entities/order'
import { InMemoryOrdersRepository } from '@test/repositories/in-memory/in-memory-orders-repository'

interface PickupOrderUseCaseRequest {
  orderId: string
}

interface PickupOrderUseCaseResponse {
  order: Order
}

export class PickupOrderUseCase {
  constructor(private orderRepository: InMemoryOrdersRepository) {}

  async execute({
    orderId,
  }: PickupOrderUseCaseRequest): Promise<PickupOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      throw new Error('Order not found')
    }

    order.status = Status.EN_ROUTE

    await this.orderRepository.save(order)

    return { order }
  }
}
