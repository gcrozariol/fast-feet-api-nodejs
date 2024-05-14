import { CreateOrderUseCase } from './create-order'
import { InMemoryOrdersRepository } from '../repositories/in-memory/in-memory-orders-repository'

describe('Create Order [USE CASE]', () => {
  it('should be able to create an order', async () => {
    const ordersRepository = new InMemoryOrdersRepository()
    const sut = new CreateOrderUseCase(ordersRepository)

    const { order } = await sut.execute({
      recipientId: '1',
      description: 'description',
      address: 'address',
    })

    const { recipientId, description, address, isNew } = order

    expect(recipientId.toString()).toEqual('1')
    expect(description).toEqual('description')
    expect(address).toEqual('address')
    expect(isNew).toEqual(true)
  })
})
