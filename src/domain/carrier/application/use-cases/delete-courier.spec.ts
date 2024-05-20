import { DeleteCourierUseCase } from './delete-courier'
import { makeCourier } from '@test/factories/make-courier'
import { InMemoryCouriersRepository } from 'test/repositories/in-memory/in-memory-couriers-repository'

describe('Delete Courier [USE CASE]', () => {
  it('should be able to delete an courier', async () => {
    const inMemoryCouriersRepository = new InMemoryCouriersRepository()
    const sut = new DeleteCourierUseCase(inMemoryCouriersRepository)

    const courier = makeCourier()

    await inMemoryCouriersRepository.create(courier)
    expect(inMemoryCouriersRepository.items).toHaveLength(1)

    await sut.execute({ courierId: courier.id.toString() })
    expect(inMemoryCouriersRepository.items).toHaveLength(0)
  })
})
