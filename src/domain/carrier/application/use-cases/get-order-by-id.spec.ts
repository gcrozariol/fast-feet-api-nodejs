import { makeOrder } from '@test/factories/make-order'
import { InMemoryOrdersRepository } from '@test/repositories/in-memory/in-memory-orders-repository'
import { GetOrderByIdUseCase } from './get-order-by-id'
import { Status } from '../../enterprise/entities/order'

describe('Find Order by ID [USE CASE]', () => {
  it('should be able to find an order by its id', async () => {
    const ordersRepository = new InMemoryOrdersRepository()
    const sut = new GetOrderByIdUseCase(ordersRepository)

    const address = 'Avenida Washington Luis, 1800'
    const description = 'iPhone 15 Pro Max'
    const status = Status.READY_FOR_PICKUP

    const newOrder = makeOrder({
      address,
      description,
      status,
    })

    await ordersRepository.create(newOrder)

    const { order } = await sut.execute({
      orderId: newOrder.id.toString(),
    })

    expect(order.id).toBeTruthy()
    expect(order.address).toEqual(address)
    expect(order.description).toEqual(description)
    expect(order.status).toEqual(status)
  })
})
