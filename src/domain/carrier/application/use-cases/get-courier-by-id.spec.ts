import { makeCourier } from '@test/factories/make-courier'
import { InMemoryCouriersRepository } from '@test/repositories/in-memory/in-memory-couriers-repository'
import { GetCourierByIdUseCase } from './get-courier-by-id'

describe('Find Courier by ID [USE CASE]', () => {
  it('should be able to find an courier by its id', async () => {
    const couriersRepository = new InMemoryCouriersRepository()
    const sut = new GetCourierByIdUseCase(couriersRepository)

    const newCourier = makeCourier()
    const newCourierId = newCourier.id

    await couriersRepository.create(newCourier)

    const { courier } = await sut.execute({
      courierId: newCourier.id.toString(),
    })

    expect(courier.id).toEqual(newCourierId)
  })
})
