import { makeOrder } from '@test/factories/make-order'
import { InMemoryOrdersRepository } from '@test/repositories/in-memory/in-memory-orders-repository'
import { GetOrderByIdUseCase } from './get-order-by-id'

describe('Find Order by ID [USE CASE]', () => {
  it('should be able to find an order by its id', async () => {
    const ordersRepository = new InMemoryOrdersRepository()
    const sut = new GetOrderByIdUseCase(ordersRepository)

    const newOrder = makeOrder()
    const newOrderId = newOrder.id

    await ordersRepository.create(newOrder)

    const { order } = await sut.execute({
      orderId: newOrder.id.toString(),
    })

    expect(order.id).toEqual(newOrderId)
  })
})
