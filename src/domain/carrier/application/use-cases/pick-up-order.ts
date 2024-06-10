import { Either, left, right } from '@/core/either'
import { Order, Status } from '@/domain/carrier/enterprise/entities/order'
import { InMemoryOrdersRepository } from '@test/repositories/in-memory/in-memory-orders-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface PickupOrderUseCaseRequest {
  orderId: string
}

type PickupOrderUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    order: Order
  }
>

export class PickupOrderUseCase {
  constructor(private orderRepository: InMemoryOrdersRepository) {}

  async execute({
    orderId,
  }: PickupOrderUseCaseRequest): Promise<PickupOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    order.status = Status.EN_ROUTE

    await this.orderRepository.save(order)

    return right({ order })
  }
}
