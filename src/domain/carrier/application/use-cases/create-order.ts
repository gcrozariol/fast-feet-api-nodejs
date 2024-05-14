import { Order } from '@/domain/carrier/enterprise/entities/order'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryOrdersRepository } from '@test/repositories/in-memory/in-memory-orders-repository'

interface CreateOrderUseCaseRequest {
  recipientId: string
  description: string
  address: string
}

interface CreateOrderUseCaseResponse {
  order: Order
}

export class CreateOrderUseCase {
  constructor(private readonly ordersRepository: InMemoryOrdersRepository) {}

  async execute({
    recipientId,
    description,
    address,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const order = Order.create({
      recipientId: new UniqueEntityID(recipientId),
      description,
      address,
    })

    await this.ordersRepository.create(order)

    return { order }
  }
}
