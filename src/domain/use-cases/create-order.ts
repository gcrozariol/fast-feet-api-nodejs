import { Order } from '@/domain/entities/order'
import { OrdersRepository } from '@/domain/repositories/orders-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface CreateOrderUseCaseRequest {
  recipientId: string
  description: string
  address: string
}

export class CreateOrderUseCase {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async execute({
    recipientId,
    description,
    address,
  }: CreateOrderUseCaseRequest) {
    const order = Order.create({
      recipientId: new UniqueEntityID(recipientId),
      description,
      address,
    })

    await this.ordersRepository.create(order)

    return order
  }
}
