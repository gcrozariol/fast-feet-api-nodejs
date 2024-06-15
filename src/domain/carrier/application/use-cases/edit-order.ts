import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Order, Status } from '@/domain/carrier/enterprise/entities/order'
import { InMemoryOrdersRepository } from '@test/repositories/in-memory/in-memory-orders-repository'
import { EditOrderProps } from '../repositories/orders-repository'

interface EditOrderUseCaseRequest {
  orderId: string
  courierId: string
  props: EditOrderProps
}

type EditOrderUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    order: Order
  }
>

export class EditOrderUseCase {
  constructor(private orderRepository: InMemoryOrdersRepository) {}

  async execute({
    orderId,
    courierId,
    props,
  }: EditOrderUseCaseRequest): Promise<EditOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    const { status, ...otherProps } = props

    if (
      order.courierId &&
      order.courierId.toString() === courierId &&
      status === Status.DELIVERED &&
      order.status !== status
    ) {
      order.status = status
    }

    Object.assign(order, otherProps)

    await this.orderRepository.save(order)

    return right({ order })
  }
}
