import { Either, left, right } from '@/core/either'
import { Order, Status } from '@/domain/carrier/enterprise/entities/order'
import { InMemoryOrdersRepository } from '@test/repositories/in-memory/in-memory-orders-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UpdateOrderStatusUseCaseRequest {
  orderId: string
  status: Status
}

type UpdateOrderStatusUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    order: Order
  }
>

export class UpdateOrderStatusUseCase {
  constructor(private orderRepository: InMemoryOrdersRepository) {}

  async execute({
    orderId,
    status,
  }: UpdateOrderStatusUseCaseRequest): Promise<UpdateOrderStatusUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    order.status = status

    await this.orderRepository.save(order)

    return right({ order })
  }
}
