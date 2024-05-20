import { makeOrder } from 'test/factories/make-order'
import { InMemoryOrdersRepository } from '@test/repositories/in-memory/in-memory-orders-repository'
import { FetchOrdersByStatusUseCase } from './fetch-orders-by-status'
import { Status } from '../../enterprise/entities/order'

let ordersRepository: InMemoryOrdersRepository
let sut: FetchOrdersByStatusUseCase

describe('Fetch Orders by Status [USE CASE]', () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository()
    sut = new FetchOrdersByStatusUseCase(ordersRepository)
  })

  it('should be able to fetch canceled orders', async () => {
    for (let index = 0; index < 12; index++) {
      const order = makeOrder({ status: Status.CANCELED })
      ordersRepository.create(order)
    }

    const { orders: firstOrdersPage } = await sut.execute({
      status: Status.CANCELED,
      page: 1,
    })

    const { orders: secondOrdersPage } = await sut.execute({
      status: Status.CANCELED,
      page: 2,
    })

    expect(firstOrdersPage).toHaveLength(10)
    expect(secondOrdersPage).toHaveLength(2)
  })

  it('should be able to fetch delivered orders', async () => {
    for (let index = 0; index < 12; index++) {
      const order = makeOrder({ status: Status.DELIVERED })
      ordersRepository.create(order)
    }

    const { orders: firstOrdersPage } = await sut.execute({
      status: Status.DELIVERED,
      page: 1,
    })

    const { orders: secondOrdersPage } = await sut.execute({
      status: Status.DELIVERED,
      page: 2,
    })

    expect(firstOrdersPage).toHaveLength(10)
    expect(secondOrdersPage).toHaveLength(2)
  })

  it('should be able to fetch en route orders', async () => {
    for (let index = 0; index < 12; index++) {
      const order = makeOrder({ status: Status.EN_ROUTE })
      ordersRepository.create(order)
    }

    const { orders: firstOrdersPage } = await sut.execute({
      status: Status.EN_ROUTE,
      page: 1,
    })

    const { orders: secondOrdersPage } = await sut.execute({
      status: Status.EN_ROUTE,
      page: 2,
    })

    expect(firstOrdersPage).toHaveLength(10)
    expect(secondOrdersPage).toHaveLength(2)
  })

  it('should be able to fetch ready for pickup orders', async () => {
    for (let index = 0; index < 12; index++) {
      const order = makeOrder({ status: Status.READY_FOR_PICKUP })
      ordersRepository.create(order)
    }

    const { orders: firstOrdersPage } = await sut.execute({
      status: Status.READY_FOR_PICKUP,
      page: 1,
    })

    const { orders: secondOrdersPage } = await sut.execute({
      status: Status.READY_FOR_PICKUP,
      page: 2,
    })

    expect(firstOrdersPage).toHaveLength(10)
    expect(secondOrdersPage).toHaveLength(2)
  })

  it('should be able to fetch returned orders', async () => {
    for (let index = 0; index < 12; index++) {
      const order = makeOrder({ status: Status.RETURNED })
      ordersRepository.create(order)
    }

    const { orders: firstOrdersPage } = await sut.execute({
      status: Status.RETURNED,
      page: 1,
    })

    const { orders: secondOrdersPage } = await sut.execute({
      status: Status.RETURNED,
      page: 2,
    })

    expect(firstOrdersPage).toHaveLength(10)
    expect(secondOrdersPage).toHaveLength(2)
  })
})
