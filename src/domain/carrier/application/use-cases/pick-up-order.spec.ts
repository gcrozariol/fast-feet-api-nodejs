import { PickupOrderUseCase } from './pick-up-order'
import { Status } from '@/domain/carrier/enterprise/entities/order'
import { makeOrder } from '@test/factories/make-order'
import { InMemoryOrdersRepository } from 'test/repositories/in-memory/in-memory-orders-repository'

describe('Pick Up Order [USE CASE]', () => {
  it('should be able to update an order status to EN_ROUTE', async () => {
    const inMemoryOrdersRepository = new InMemoryOrdersRepository()
    const sut = new PickupOrderUseCase(inMemoryOrdersRepository)

    const order = makeOrder()

    await inMemoryOrdersRepository.create(order)

    const { order: updatedOrder } = await sut.execute({
      orderId: order.id.toString(),
    })

    expect(updatedOrder.status).toEqual(Status.EN_ROUTE)
  })
})
