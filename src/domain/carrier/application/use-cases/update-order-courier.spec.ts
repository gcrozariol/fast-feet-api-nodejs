import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeCourier } from '@test/factories/make-courier'
import { makeOrder } from '@test/factories/make-order'
import { InMemoryCouriersRepository } from '@test/repositories/in-memory/in-memory-couriers-repository'
import { InMemoryOrdersRepository } from '@test/repositories/in-memory/in-memory-orders-repository'
import { UpdateOrderCourierUseCase } from './update-order-courier'

describe('Update Order Courier [USE CASE]', () => {
  it('should be able to update an order courier', async () => {
    const inMemoryOrdersRepository = new InMemoryOrdersRepository()
    const inMemoryCouriersRepository = new InMemoryCouriersRepository()
    const sut = new UpdateOrderCourierUseCase(
      inMemoryOrdersRepository,
      inMemoryCouriersRepository,
    )

    const courier = makeCourier({}, new UniqueEntityID('courier-1'))
    await inMemoryCouriersRepository.create(courier)

    const order = makeOrder({}, new UniqueEntityID('order-1'))
    await inMemoryOrdersRepository.create(order)

    const { order: updatedOrder } = await sut.execute({
      orderId: order.id.toString(),
      courierId: courier.id.toString(),
    })

    expect(updatedOrder.courierId?.toString()).toEqual('courier-1')
  })
})
