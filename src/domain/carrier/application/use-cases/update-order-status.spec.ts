import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Status } from '@/domain/carrier/enterprise/entities/order'
import { makeOrder } from '@test/factories/make-order'
import { InMemoryOrdersRepository } from '@test/repositories/in-memory/in-memory-orders-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UpdateOrderStatusUseCase } from './update-order-status'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let sut: UpdateOrderStatusUseCase

describe('Update Order Status [USE CASE]', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    sut = new UpdateOrderStatusUseCase(inMemoryOrdersRepository)
  })

  it('should be able to update an order status to DELIVERED', async () => {
    const order = makeOrder({}, new UniqueEntityID('order-1'))

    await inMemoryOrdersRepository.create(order)

    const result = await sut.execute({
      orderId: 'order-1',
      status: Status.DELIVERED,
    })

    expect(result.isRight()).toEqual(true)
    expect(inMemoryOrdersRepository.items[0].status).toEqual(Status.DELIVERED)
  })

  it('should be able to update an inexistent order status to DELIVERED', async () => {
    const result = await sut.execute({
      orderId: 'inexistent-order-1',
      status: Status.DELIVERED,
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
