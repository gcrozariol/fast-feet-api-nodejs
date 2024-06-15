import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order } from '@/domain/carrier/enterprise/entities/order'
import { InMemoryOrdersRepository } from '@test/repositories/in-memory/in-memory-orders-repository'

interface RegisterOrderUseCaseRequest {
  recipientId: string
  description: string
  address: string
}

type RegisterOrderUseCaseResponse = Either<
  null,
  {
    order: Order
  }
>

export class RegisterOrderUseCase {
  constructor(private readonly ordersRepository: InMemoryOrdersRepository) {}

  async execute({
    recipientId,
    description,
    address,
  }: RegisterOrderUseCaseRequest): Promise<RegisterOrderUseCaseResponse> {
    const order = Order.create({
      recipientId: new UniqueEntityID(recipientId),
      description,
      address,
    })

    await this.ordersRepository.create(order)

    return right({ order })
  }
}
