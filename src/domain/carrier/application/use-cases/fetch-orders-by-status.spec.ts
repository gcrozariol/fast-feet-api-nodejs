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

    const canceledOrder = makeOrder({ status: Status.CANCELED })
    const deliveredOrder = makeOrder({ status: Status.DELIVERED })
    const enRouteOrder = makeOrder({ status: Status.EN_ROUTE })
    const readyForPickupOrder = makeOrder({ status: Status.READY_FOR_PICKUP })
    const returnedOrder = makeOrder({ status: Status.RETURNED })

    ordersRepository.create(canceledOrder)
    ordersRepository.create(deliveredOrder)
    ordersRepository.create(enRouteOrder)
    ordersRepository.create(readyForPickupOrder)
    ordersRepository.create(returnedOrder)
  })

  it('should be able to fetch CANCELED orders', async () => {
    const result = await sut.execute({
      status: Status.CANCELED,
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

  it('should be able to fetch EN_ROUTE orders', async () => {
    const result = await sut.execute({
      status: Status.EN_ROUTE,
      page: 1,
    })

    expect(result.isRight()).toEqual(true)
    expect(result.value?.orders).toHaveLength(1)
  })

  it('should be able to fetch READY_FOR_PICKUP orders', async () => {
    const result = await sut.execute({
      status: Status.READY_FOR_PICKUP,
      page: 1,
    })

    expect(result.isRight()).toEqual(true)
    expect(result.value?.orders).toHaveLength(1)
  })

  it('should be able to fetch RETURNED orders', async () => {
    const result = await sut.execute({
      status: Status.RETURNED,
      page: 1,
    })

    expect(result.isRight()).toEqual(true)
    expect(result.value?.orders).toHaveLength(1)
  })
})
