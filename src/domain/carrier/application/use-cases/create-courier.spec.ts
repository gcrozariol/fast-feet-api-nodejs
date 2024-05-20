import { CreateCourierUseCase } from './create-courier'
import { InMemoryCouriersRepository } from '@test/repositories/in-memory/in-memory-couriers-repository'

describe('Create Courier [USE CASE]', () => {
  it('should be able to create an courier', async () => {
    const couriersRepository = new InMemoryCouriersRepository()
    const sut = new CreateCourierUseCase(couriersRepository)

    const courierName = 'Guilherme Crozariol'

    const { courier } = await sut.execute({
      name: courierName,
    })

    const { name } = courier

    expect(name).toEqual(courierName)
  })
})
