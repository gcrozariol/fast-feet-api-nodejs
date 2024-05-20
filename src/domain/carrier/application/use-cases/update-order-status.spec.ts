import { UpdateOrderStatusUseCase } from './update-order-status'
import { Status } from '@/domain/carrier/enterprise/entities/order'
import { makeOrder } from '@test/factories/make-order'
import { InMemoryOrdersRepository } from 'test/repositories/in-memory/in-memory-orders-repository'

describe('Update Order Status [USE CASE]', () => {
  it('should be able to update an order status to DELIVERED', async () => {
    const inMemoryOrdersRepository = new InMemoryOrdersRepository()
    const sut = new UpdateOrderStatusUseCase(inMemoryOrdersRepository)

    const order = makeOrder()

    await inMemoryOrdersRepository.create(order)

    const { order: updatedOrder } = await sut.execute({
      orderId: order.id.toString(),
      status: Status.DELIVERED,
    })

    expect(updatedOrder.status).toEqual(Status.DELIVERED)
  })
})
