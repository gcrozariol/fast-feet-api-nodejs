import { InMemoryCouriersRepository } from '@test/repositories/in-memory/in-memory-couriers-repository'
import { CreateCourierUseCase } from './create-courier'

describe('Create Courier [USE CASE]', () => {
  it('should be able to create an courier', async () => {
    const couriersRepository = new InMemoryCouriersRepository()
    const sut = new CreateCourierUseCase(couriersRepository)

    const result = await sut.execute({ name: 'John Doe' })

    expect(result.isRight()).toEqual(true)
    expect(result.value?.courier.name).toEqual('John Doe')
  })
})
