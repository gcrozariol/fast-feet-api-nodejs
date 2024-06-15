import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeCourier } from '@test/factories/make-courier'
import { InMemoryCouriersRepository } from '@test/repositories/in-memory/in-memory-couriers-repository'
import { DeleteCourierUseCase } from './delete-courier'

describe('Delete Courier [USE CASE]', () => {
  it('should be able to delete an courier', async () => {
    const inMemoryCouriersRepository = new InMemoryCouriersRepository()
    const sut = new DeleteCourierUseCase(inMemoryCouriersRepository)

    const courier = makeCourier({}, new UniqueEntityID('courier-1'))

    await inMemoryCouriersRepository.create(courier)
    expect(inMemoryCouriersRepository.items).toHaveLength(1)

    const result = await sut.execute({ courierId: 'courier-1' })

    expect(result.isRight()).toEqual(true)
    expect(inMemoryCouriersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete an inexistent courier', async () => {
    const inMemoryCouriersRepository = new InMemoryCouriersRepository()
    const sut = new DeleteCourierUseCase(inMemoryCouriersRepository)

    const result = await sut.execute({ courierId: 'inexistent-courier-1' })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).instanceOf(ResourceNotFoundError)
  })
})
