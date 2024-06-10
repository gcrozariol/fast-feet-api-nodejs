import { PickupOrderUseCase } from './pick-up-order'
import { Status } from '@/domain/carrier/enterprise/entities/order'
import { makeOrder } from '@test/factories/make-order'
import { InMemoryOrdersRepository } from 'test/repositories/in-memory/in-memory-orders-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let sut: PickupOrderUseCase

describe('Pick Up Order [USE CASE]', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    sut = new PickupOrderUseCase(inMemoryOrdersRepository)
  })

  it('should be able to update an order status to EN_ROUTE', async () => {
    const order = makeOrder()

    await inMemoryOrdersRepository.create(order)

    const result = await sut.execute({
      orderId: order.id.toString(),
    })

    expect(result.isRight()).toEqual(true)
    expect(inMemoryOrdersRepository.items[0].status).toEqual(Status.EN_ROUTE)
  })

  it('should be not able to update an inexistent order status to EN_ROUTE', async () => {
    const result = await sut.execute({
      orderId: 'inexistent-order-1',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
