import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteOrderUseCase } from './delete-order'
import { makeOrder } from '@test/factories/make-order'
import { InMemoryOrdersRepository } from 'test/repositories/in-memory/in-memory-orders-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let sut: DeleteOrderUseCase

describe('Delete Order [USE CASE]', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    sut = new DeleteOrderUseCase(inMemoryOrdersRepository)
  })

  it('should be able to delete an order', async () => {
    const order = makeOrder({}, new UniqueEntityID('order-1'))

    await inMemoryOrdersRepository.create(order)

    const result = await sut.execute({ orderId: 'order-1' })

    expect(result.isRight()).toEqual(true)
    expect(inMemoryOrdersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete an inexistent order', async () => {
    const result = await sut.execute({ orderId: 'inexistent-order-1' })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
