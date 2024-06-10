import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CouriersRepository } from '../repositories/couriers-repository'
import { OrdersRepository } from '../repositories/orders-repository'
import { Order } from '../../enterprise/entities/order'

interface UpdateOrderCourierUseCaseRequest {
  orderId: string
  courierId: string
}

interface UpdateOrderCourierUseCaseResponse {
  order: Order
}

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
      throw new Error('Order not found.')
    }

    const courier = await this.couriersReository.findById(courierId)

    if (!courier) {
      throw new Error('Courier not found.')
    }

    order.courierId = new UniqueEntityID(courierId)

    await this.ordersRepository.save(order)

    return {
      order,
    }
  }
}
