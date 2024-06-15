import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Order, Status } from '@/domain/carrier/enterprise/entities/order'
import { InMemoryOrdersRepository } from '@test/repositories/in-memory/in-memory-orders-repository'

interface MarkOrderAsDeliveredUseCaseRequest {
  orderId: string
  courierId: string
}

type MarkOrderAsDeliveredUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    order: Order
  }
>

export class MarkOrderAsDeliveredUseCase {
  constructor(private orderRepository: InMemoryOrdersRepository) {}

  async execute({
    orderId,
    courierId,
  }: MarkOrderAsDeliveredUseCaseRequest): Promise<MarkOrderAsDeliveredUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    if (order.courierId?.toString() !== courierId) {
      return left(new NotAllowedError())
    }

    order.status = Status.DELIVERED

    await this.orderRepository.save(order)

    return right({ order })
  }
}
