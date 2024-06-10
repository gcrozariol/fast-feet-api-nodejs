import { makeOrder } from 'test/factories/make-order'
import { InMemoryOrdersRepository } from '@test/repositories/in-memory/in-memory-orders-repository'
import { FetchOrdersByAddressUseCase } from './fetch-orders-by-address'

let ordersRepository: InMemoryOrdersRepository
let sut: FetchOrdersByAddressUseCase

describe('Fetch Orders by Address [USE CASE]', () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository()
    sut = new FetchOrdersByAddressUseCase(ordersRepository)
  })

  it('should be able to fetch orders with exact address', async () => {
    const order = makeOrder({
      address: 'address',
    })

    ordersRepository.create(order)

    const result = await sut.execute({ address: 'address', page: 1 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.orders).toHaveLength(1)
    expect(result.value?.orders[0].address).toEqual('address')
  })

  it('should fetch an empty list if orders cannot be found with provided address', async () => {
    const result = await sut.execute({
      address: 'inexistent_address',
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.orders).toHaveLength(0)
  })
})
