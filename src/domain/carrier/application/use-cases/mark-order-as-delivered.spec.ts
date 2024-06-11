import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeOrder } from '@test/factories/make-order'
import { InMemoryOrdersRepository } from '@test/repositories/in-memory/in-memory-orders-repository'
import { MarkOrderAsDeliveredUseCase } from './mark-order-as-delivered'

describe('Mark Order as Delivered [USE CASE]', () => {
  it('should be able to update an order status to DELIVERED', async () => {
    const inMemoryOrdersRepository = new InMemoryOrdersRepository()
    const sut = new MarkOrderAsDeliveredUseCase(inMemoryOrdersRepository)

    const order = makeOrder(
      { courierId: new UniqueEntityID('courier-1') },
      new UniqueEntityID('order-1'),
    )

    await inMemoryOrdersRepository.create(order)

    const result = await sut.execute({
      orderId: 'order-1',
      courierId: 'courier-1',
    })

    expect(result.isRight()).toEqual(true)
    expect(inMemoryOrdersRepository.items[0]).toEqual(order)
  })

  it('should not be able to update an inexistent order status to DELIVERED', async () => {
    const inMemoryOrdersRepository = new InMemoryOrdersRepository()
    const sut = new MarkOrderAsDeliveredUseCase(inMemoryOrdersRepository)

    const result = await sut.execute({
      orderId: 'inexistent-order-1',
      courierId: 'courier-2',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to update another courier order status to DELIVERED', async () => {
    const inMemoryOrdersRepository = new InMemoryOrdersRepository()
    const sut = new MarkOrderAsDeliveredUseCase(inMemoryOrdersRepository)

    const order = makeOrder(
      { courierId: new UniqueEntityID('courier-1') },
      new UniqueEntityID('order-1'),
    )

    await inMemoryOrdersRepository.create(order)

    const result = await sut.execute({
      orderId: 'order-1',
      courierId: 'courier-2',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
