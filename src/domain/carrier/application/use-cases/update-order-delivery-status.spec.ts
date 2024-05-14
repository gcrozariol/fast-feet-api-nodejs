import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UpdateOrderDeliveryStatusUseCase } from './update-order-delivery-status'
import { Order, Status } from '@/domain/carrier/enterprise/entities/order'

test('update order status', async () => {
  const sut = new UpdateOrderDeliveryStatusUseCase()

  const order = Order.create({
    recipientId: new UniqueEntityID(),
    description: 'description',
    address: 'address',
  })

  const updateOrderToDelivered = sut.execute({
    order,
    status: Status.DELIVERED,
  })

  expect(updateOrderToDelivered.status).toEqual(Status.DELIVERED)
})
