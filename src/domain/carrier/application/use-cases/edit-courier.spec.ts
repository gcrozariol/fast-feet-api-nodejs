import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeCourier } from '@test/factories/make-courier'
import { InMemoryCouriersRepository } from '@test/repositories/in-memory/in-memory-couriers-repository'
import { EditCourierUseCase } from './edit-courier'

let inMemoryCouriersRepository: InMemoryCouriersRepository
let sut: EditCourierUseCase

describe('Edit Courier [USE CASE]', () => {
  beforeEach(() => {
    inMemoryCouriersRepository = new InMemoryCouriersRepository()
    sut = new EditCourierUseCase(inMemoryCouriersRepository)
  })

  it('should be able to update a courier name', async () => {
    const courier = makeCourier({}, new UniqueEntityID('courier-1'))

    await inMemoryCouriersRepository.create(courier)

    const result = await sut.execute({
      courierId: 'courier-1',
      props: {
        name: 'John Doe',
      },
    })

    expect(result.isRight()).toEqual(true)

    expect(inMemoryCouriersRepository.items[0].id.toString()).toEqual(
      'courier-1',
    )
    expect(inMemoryCouriersRepository.items[0].name).toEqual('John Doe')
  })

  it('should not be able to update info of an inexistent courier', async () => {
    const result = await sut.execute({
      courierId: 'inexistent-courier-1',
      props: {
        name: 'John Doe',
      },
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
