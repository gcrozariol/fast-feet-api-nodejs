import { CreateCourierUseCase } from './create-courier'
import { InMemoryCouriersRepository } from '@test/repositories/in-memory/in-memory-couriers-repository'

describe('Create Courier [USE CASE]', () => {
  it('should be able to create an courier', async () => {
    const couriersRepository = new InMemoryCouriersRepository()
    const sut = new CreateCourierUseCase(couriersRepository)

    const courierName = 'John Doe'

    const result = await sut.execute({ name: courierName })

    expect(result.isRight()).toEqual(true)
    expect(result.value?.courier.name).toEqual(courierName)
  })
})
