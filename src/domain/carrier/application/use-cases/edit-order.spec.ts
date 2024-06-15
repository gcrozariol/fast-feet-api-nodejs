import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Status } from '@/domain/carrier/enterprise/entities/order'
import { makeOrder } from '@test/factories/make-order'
import { InMemoryOrdersRepository } from '@test/repositories/in-memory/in-memory-orders-repository'
import { EditOrderUseCase } from './edit-order'

describe('Edit Order [USE CASE]', () => {
  it('should be able to update an order status', async () => {
    const inMemoryOrdersRepository = new InMemoryOrdersRepository()
    const sut = new EditOrderUseCase(inMemoryOrdersRepository)

    const order = makeOrder(
      { courierId: new UniqueEntityID('courier-1') },
      new UniqueEntityID('order-1'),
    )

    await inMemoryOrdersRepository.create(order)

    const result = await sut.execute({
      orderId: 'order-1',
      courierId: 'courier-1',
      props: {
        status: Status.DELIVERED,
      },
    })

    expect(result.isRight()).toEqual(true)
    expect(inMemoryOrdersRepository.items[0].status).toEqual(Status.DELIVERED)
  })
})
