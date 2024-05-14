import { UpdateOrderDeliveryStatusUseCase } from './update-order-delivery-status'
import { Status } from '@/domain/carrier/enterprise/entities/order'
import { InMemoryOrdersRepository } from '../repositories/in-memory/in-memory-orders-repository'
import { makeOrder } from 'test/factories/make-order'

test('update order status', async () => {
  const inMemoryOrdersRepository = new InMemoryOrdersRepository()
  const sut = new UpdateOrderDeliveryStatusUseCase(inMemoryOrdersRepository)

  const order = makeOrder()

  await inMemoryOrdersRepository.create(order)

  const { order: updatedOrder } = await sut.execute({
    orderId: order.id.toString(),
    status: Status.DELIVERED,
  })

  expect(updatedOrder.status).toEqual(Status.DELIVERED)
})
