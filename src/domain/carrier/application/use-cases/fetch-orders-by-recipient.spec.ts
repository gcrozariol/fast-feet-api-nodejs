import { makeOrder } from 'test/factories/make-order'
import { InMemoryOrdersRepository } from '@test/repositories/in-memory/in-memory-orders-repository'
import { FetchOrdersByRecipientUseCase } from './fetch-orders-by-recipient'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let ordersRepository: InMemoryOrdersRepository
let sut: FetchOrdersByRecipientUseCase

describe('Fetch Orders by Recipient [USE CASE]', () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository()
    sut = new FetchOrdersByRecipientUseCase(ordersRepository)
  })

  it('should be able to fetch orders with exact recipient id', async () => {
    for (let index = 0; index < 12; index++) {
      const order = makeOrder({
        recipientId: new UniqueEntityID('1'),
      })

      ordersRepository.create(order)
    }

    const { orders: firstOrdersPage } = await sut.execute({
      recipientId: '1',
      page: 1,
    })

    const { orders: secondOrdersPage } = await sut.execute({
      recipientId: '1',
      page: 2,
    })

    expect(firstOrdersPage).toHaveLength(10)
    expect(secondOrdersPage).toHaveLength(2)
  })

  it('should fetch an empty list if orders cannot be found with provided recipient id', async () => {
    const { orders } = await sut.execute({
      recipientId: 'inexistent_recipient_id',
      page: 1,
    })

    expect(orders).toHaveLength(0)
  })
})