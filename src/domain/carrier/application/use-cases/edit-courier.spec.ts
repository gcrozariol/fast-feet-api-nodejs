import { EditCourierUseCase } from './edit-courier'
import { makeCourier } from '@test/factories/make-courier'
import { InMemoryCouriersRepository } from 'test/repositories/in-memory/in-memory-couriers-repository'

describe('Edit Courier [USE CASE]', () => {
  it('should be able to update a courier name', async () => {
    const inMemoryCouriersRepository = new InMemoryCouriersRepository()
    const sut = new EditCourierUseCase(inMemoryCouriersRepository)

    const courier = makeCourier()

    await inMemoryCouriersRepository.create(courier)

    const { courier: updatedCourier } = await sut.execute({
      courierId: courier.id.toString(),
      props: {
        name: 'John Doe',
      },
    })

    expect(updatedCourier.id).toBeTruthy()
    expect(updatedCourier.name).toEqual('John Doe')
  })
})
