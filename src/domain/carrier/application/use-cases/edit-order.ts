import { Order } from '@/domain/carrier/enterprise/entities/order'
import { InMemoryOrdersRepository } from '@test/repositories/in-memory/in-memory-orders-repository'
import { EditOrderProps } from '../repositories/orders-repository'

interface EditOrderUseCaseRequest {
  orderId: string
  props: EditOrderProps
}

interface EditOrderUseCaseResponse {
  order: Order
}

export class EditOrderUseCase {
  constructor(private orderRepository: InMemoryOrdersRepository) {}

  async execute({
    orderId,
    props,
  }: EditOrderUseCaseRequest): Promise<EditOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      throw new Error('Order not found')
    }

    Object.assign(order, props)

    await this.orderRepository.save(order)

    return { order }
  }
}
