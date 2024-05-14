import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order } from '@/domain/entities/order'
import { OrdersRepository } from '@/domain/repositories/orders-repository'
import { CreateOrderUseCase } from './create-order'

const fakeOrdersRepository: OrdersRepository = {
  create: async (order: Order) => {},
}

test('create an order', async () => {
  const sut = new CreateOrderUseCase(fakeOrdersRepository)

  const { recipientId, description, address } = await sut.execute({
    recipientId: '1',
    description: 'description',
    address: 'address',
  })

  expect(recipientId.toString()).toEqual('1')
  expect(description).toEqual('description')
  expect(address).toEqual('address')
})
