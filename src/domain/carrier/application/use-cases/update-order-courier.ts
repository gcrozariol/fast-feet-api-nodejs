import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CouriersRepository } from '../repositories/couriers-repository'
import { OrdersRepository } from '../repositories/orders-repository'
import { Order } from '../../enterprise/entities/order'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UpdateOrderCourierUseCaseRequest {
  orderId: string
  courierId: string
}

type UpdateOrderCourierUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    order: Order
  }
>

export class UpdateOrderCourierUseCase {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly couriersReository: CouriersRepository,
  ) {}

  async execute({
    orderId,
    courierId,
  }: UpdateOrderCourierUseCaseRequest): Promise<UpdateOrderCourierUseCaseResponse> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    const courier = await this.couriersReository.findById(courierId)

    if (!courier) {
      return left(new ResourceNotFoundError())
    }

    order.courierId = new UniqueEntityID(courierId)

    await this.ordersRepository.save(order)

    return right({ order })
  }
}
