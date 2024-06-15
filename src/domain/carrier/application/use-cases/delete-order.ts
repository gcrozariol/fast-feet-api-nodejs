import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { InMemoryOrdersRepository } from '@test/repositories/in-memory/in-memory-orders-repository'

interface DeleteOrderUseCaseRequest {
  orderId: string
}

type DeleteOrderUseCaseResponse = Either<ResourceNotFoundError, {}>

export class DeleteOrderUseCase {
  constructor(private orderRepository: InMemoryOrdersRepository) {}

  async execute({
    orderId,
  }: DeleteOrderUseCaseRequest): Promise<DeleteOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    this.orderRepository.delete(order)

    return right({})
  }
}
