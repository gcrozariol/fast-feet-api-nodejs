import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteOrderUseCase } from './delete-order'
import { makeOrder } from '@test/factories/make-order'
import { InMemoryOrdersRepository } from 'test/repositories/in-memory/in-memory-orders-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

describe('Delete Order [USE CASE]', () => {
  it('should be able to delete an order', async () => {
    const inMemoryOrdersRepository = new InMemoryOrdersRepository()
    const sut = new DeleteOrderUseCase(inMemoryOrdersRepository)

    const order = makeOrder({}, new UniqueEntityID('order-1'))

    await inMemoryOrdersRepository.create(order)

    const result = await sut.execute({ orderId: 'order-1' })

    expect(result.isRight()).toEqual(true)
    expect(inMemoryOrdersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete an inexistent order', async () => {
    const inMemoryOrdersRepository = new InMemoryOrdersRepository()
    const sut = new DeleteOrderUseCase(inMemoryOrdersRepository)

    const result = await sut.execute({ orderId: 'inexistent-order-1' })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
