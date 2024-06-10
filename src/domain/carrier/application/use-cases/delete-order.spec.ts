import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteOrderUseCase } from './delete-order'
import { makeOrder } from '@test/factories/make-order'
import { InMemoryOrdersRepository } from 'test/repositories/in-memory/in-memory-orders-repository'

describe('Delete Order [USE CASE]', () => {
  it('should be able to delete an order', async () => {
    const inMemoryOrdersRepository = new InMemoryOrdersRepository()
    const sut = new DeleteOrderUseCase(inMemoryOrdersRepository)

    const order = makeOrder({}, new UniqueEntityID('order-1'))

    await inMemoryOrdersRepository.create(order)

    await sut.execute({ orderId: 'order-1' })

    expect(inMemoryOrdersRepository.items).toHaveLength(0)
  })
})
