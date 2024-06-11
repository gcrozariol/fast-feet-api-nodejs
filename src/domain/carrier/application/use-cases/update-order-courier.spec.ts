import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeCourier } from '@test/factories/make-courier'
import { makeOrder } from '@test/factories/make-order'
import { InMemoryCouriersRepository } from '@test/repositories/in-memory/in-memory-couriers-repository'
import { InMemoryOrdersRepository } from '@test/repositories/in-memory/in-memory-orders-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UpdateOrderCourierUseCase } from './update-order-courier'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let inMemoryCouriersRepository: InMemoryCouriersRepository
let sut: UpdateOrderCourierUseCase

describe('Update Order Courier [USE CASE]', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    inMemoryCouriersRepository = new InMemoryCouriersRepository()
    sut = new UpdateOrderCourierUseCase(
      inMemoryOrdersRepository,
      inMemoryCouriersRepository,
    )
  })

  it('should be able to update an order courier', async () => {
    const courier = makeCourier({}, new UniqueEntityID('courier-1'))
    await inMemoryCouriersRepository.create(courier)

    const order = makeOrder({}, new UniqueEntityID('order-1'))
    await inMemoryOrdersRepository.create(order)

    const result = await sut.execute({
      orderId: 'order-1',
      courierId: 'courier-1',
    })

    expect(result.isRight()).toEqual(true)
    expect(inMemoryOrdersRepository.items[0].courierId?.toString()).toEqual(
      'courier-1',
    )
  })

  it('should be not able to update an inexistent order courier', async () => {
    const courier = makeCourier({}, new UniqueEntityID('courier-1'))
    await inMemoryCouriersRepository.create(courier)

    const result = await sut.execute({
      orderId: 'inexistent-order-1',
      courierId: courier.id.toString(),
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should be not able to update an order with inexistent courier', async () => {
    const order = makeOrder({}, new UniqueEntityID('order-1'))
    await inMemoryOrdersRepository.create(order)

    const result = await sut.execute({
      orderId: 'order-1',
      courierId: 'inexistent-courier-1',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
