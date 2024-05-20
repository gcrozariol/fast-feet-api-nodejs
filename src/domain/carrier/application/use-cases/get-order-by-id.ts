import { InMemoryOrdersRepository } from '@test/repositories/in-memory/in-memory-orders-repository'
import { Order } from '../../enterprise/entities/order'

interface GetOrderByIdUseCaseRequest {
  orderId: string
}

interface GetOrderByIdUseCaseResponse {
  order: Order
}

export class GetOrderByIdUseCase {
  constructor(private readonly ordersRepository: InMemoryOrdersRepository) {}

  async execute({
    orderId,
  }: GetOrderByIdUseCaseRequest): Promise<GetOrderByIdUseCaseResponse> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      throw new Error('Order not found')
    }

    return { order }
  }
}
