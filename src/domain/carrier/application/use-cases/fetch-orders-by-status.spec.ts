import { makeOrder } from '@test/factories/make-order'
import { InMemoryOrdersRepository } from '@test/repositories/in-memory/in-memory-orders-repository'
import { Status } from '../../enterprise/entities/order'
import { FetchOrdersByStatusUseCase } from './fetch-orders-by-status'

let ordersRepository: InMemoryOrdersRepository
let sut: FetchOrdersByStatusUseCase

describe('Fetch Orders by Status [USE CASE]', () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository()
    sut = new FetchOrdersByStatusUseCase(ordersRepository)

    const readyForPickupOrder = makeOrder({ status: Status.READY_FOR_PICKUP })
    const enRouteOrder = makeOrder({ status: Status.EN_ROUTE })
    const deliveredOrder = makeOrder({ status: Status.DELIVERED })

    ordersRepository.create(readyForPickupOrder)
    ordersRepository.create(enRouteOrder)
    ordersRepository.create(deliveredOrder)
  })

  it('should be able to fetch READY_FOR_PICKUP orders', async () => {
    const result = await sut.execute({
      status: Status.READY_FOR_PICKUP,
      page: 1,
    })

    expect(result.isRight()).toEqual(true)
    expect(result.value?.orders).toHaveLength(1)
  })

  it('should be able to fetch EN_ROUTE orders', async () => {
    const result = await sut.execute({
      status: Status.EN_ROUTE,
      page: 1,
    })

    expect(result.isRight()).toEqual(true)
    expect(result.value?.orders).toHaveLength(1)
  })

  it('should be able to fetch DELIVERED orders', async () => {
    const result = await sut.execute({
      status: Status.DELIVERED,
      page: 1,
    })

    expect(result.isRight()).toEqual(true)
    expect(result.value?.orders).toHaveLength(1)
  })
})
