import { DeleteOrderUseCase } from './delete-order'
import { makeOrder } from '@test/factories/make-order'
import { InMemoryOrdersRepository } from 'test/repositories/in-memory/in-memory-orders-repository'

describe('Delete Order [USE CASE]', () => {
  it('should be able to delete an order', async () => {
    const inMemoryOrdersRepository = new InMemoryOrdersRepository()
    const sut = new DeleteOrderUseCase(inMemoryOrdersRepository)

    const order = makeOrder()

    await inMemoryOrdersRepository.create(order)

    await sut.execute({ orderId: order.id.toString() })
  })
})
