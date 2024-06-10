import { makeOrder } from '@test/factories/make-order'
import { InMemoryOrdersRepository } from '@test/repositories/in-memory/in-memory-orders-repository'
import { GetOrderByIdUseCase } from './get-order-by-id'
import { Status } from '../../enterprise/entities/order'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let ordersRepository: InMemoryOrdersRepository
let sut: GetOrderByIdUseCase

describe('Find Order by ID [USE CASE]', () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository()
    sut = new GetOrderByIdUseCase(ordersRepository)
  })

  it('should be able to find an order by its id', async () => {
    const newOrder = makeOrder(
      {
        address: 'Washington Luis, 1800',
        description: 'iPhone 15 Pro Max',
        status: Status.READY_FOR_PICKUP,
      },
      new UniqueEntityID('order-1'),
    )

    await ordersRepository.create(newOrder)

    const result = await sut.execute({
      orderId: 'order-1',
    })

    expect(result.isRight()).toEqual(true)

    expect(ordersRepository.items[0].id.toValue()).toEqual('order-1')
    expect(ordersRepository.items[0].address).toEqual('Washington Luis, 1800')
    expect(ordersRepository.items[0].description).toEqual('iPhone 15 Pro Max')
    expect(ordersRepository.items[0].status).toEqual(Status.READY_FOR_PICKUP)
  })

  it('should not be able to find an inexistent order by its id', async () => {
    const result = await sut.execute({
      orderId: 'inexistent-order-1',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
