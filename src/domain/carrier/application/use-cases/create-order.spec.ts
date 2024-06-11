import { InMemoryOrdersRepository } from '@test/repositories/in-memory/in-memory-orders-repository'
import { CreateOrderUseCase } from './create-order'

describe('Create Order [USE CASE]', () => {
  it('should be able to create an order', async () => {
    const ordersRepository = new InMemoryOrdersRepository()
    const sut = new CreateOrderUseCase(ordersRepository)

    const result = await sut.execute({
      recipientId: '1',
      description: 'description',
      address: 'address',
    })

    expect(result.isRight()).toEqual(true)

    expect(result.value?.order.recipientId.toString()).toEqual('1')
    expect(result.value?.order.description).toEqual('description')
    expect(result.value?.order.address).toEqual('address')
    expect(result.value?.order.isNew).toEqual(true)
  })
})
