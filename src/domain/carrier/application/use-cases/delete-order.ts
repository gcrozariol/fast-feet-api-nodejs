import { InMemoryOrdersRepository } from '@test/repositories/in-memory/in-memory-orders-repository'

interface DeleteOrderUseCaseRequest {
  orderId: string
}

interface DeleteOrderUseCaseResponse {}

export class DeleteOrderUseCase {
  constructor(private orderRepository: InMemoryOrdersRepository) {}

  async execute({
    orderId,
  }: DeleteOrderUseCaseRequest): Promise<DeleteOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      throw new Error('Order not found')
    }

    this.orderRepository.delete(order)

    return {}
  }
}
