import { EditOrderUseCase } from './edit-order'
import { Status } from '@/domain/carrier/enterprise/entities/order'
import { makeOrder } from '@test/factories/make-order'
import { InMemoryOrdersRepository } from 'test/repositories/in-memory/in-memory-orders-repository'

describe('Edit Order [USE CASE]', () => {
  it('should be able to update an order status', async () => {
    const inMemoryOrdersRepository = new InMemoryOrdersRepository()
    const sut = new EditOrderUseCase(inMemoryOrdersRepository)

    const order = makeOrder()

    await inMemoryOrdersRepository.create(order)

    const result = await sut.execute({
      orderId: order.id.toString(),
      props: {
        status: Status.DELIVERED,
      },
    })

    expect(result.isRight()).toEqual(true)
    expect(inMemoryOrdersRepository.items[0].status).toEqual(Status.DELIVERED)
  })
})
