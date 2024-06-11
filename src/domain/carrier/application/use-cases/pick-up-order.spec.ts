import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Status } from '@/domain/carrier/enterprise/entities/order'
import { makeOrder } from '@test/factories/make-order'
import { InMemoryOrdersRepository } from '@test/repositories/in-memory/in-memory-orders-repository'
import { PickupOrderUseCase } from './pick-up-order'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let sut: PickupOrderUseCase

describe('Pick Up Order [USE CASE]', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    sut = new PickupOrderUseCase(inMemoryOrdersRepository)
  })

  it('should be able to update an order status to EN_ROUTE', async () => {
    const order = makeOrder(
      { courierId: new UniqueEntityID('courier-1') },
      new UniqueEntityID('order-1'),
    )

    await inMemoryOrdersRepository.create(order)

    const result = await sut.execute({
      courierId: 'courier-1',
      orderId: 'order-1',
    })

    expect(result.isRight()).toEqual(true)
    expect(inMemoryOrdersRepository.items[0].courierId?.toString()).toEqual(
      'courier-1',
    )
    expect(inMemoryOrdersRepository.items[0].status).toEqual(Status.EN_ROUTE)
  })

  it('should be not able to pickup an inexistent order', async () => {
    const result = await sut.execute({
      courierId: 'courier-1',
      orderId: 'inexistent-order-1',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
