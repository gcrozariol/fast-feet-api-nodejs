import { makeCourier } from '@test/factories/make-courier'
import { InMemoryCouriersRepository } from '@test/repositories/in-memory/in-memory-couriers-repository'
import { GetCourierByIdUseCase } from './get-courier-by-id'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let couriersRepository: InMemoryCouriersRepository
let sut: GetCourierByIdUseCase

describe('Get Courier by ID [USE CASE]', () => {
  beforeEach(() => {
    couriersRepository = new InMemoryCouriersRepository()
    sut = new GetCourierByIdUseCase(couriersRepository)
  })

  it('should be able to find a courier by its id', async () => {
    const newCourier = makeCourier(
      {
        name: 'John Doe',
      },
      new UniqueEntityID('courier-1'),
    )

    await couriersRepository.create(newCourier)

    const result = await sut.execute({
      courierId: 'courier-1',
    })

    expect(result.isRight()).toEqual(true)
    expect(couriersRepository.items[0].id.toValue()).toEqual('courier-1')
    expect(couriersRepository.items[0].name).toEqual('John Doe')
  })

  it('should not be able to find an inexistent courier by id', async () => {
    const result = await sut.execute({
      courierId: 'inexistent-courier-1',
    })

    expect(result.isLeft()).toEqual(true)
    expect(couriersRepository.items.length).toEqual(0)
  })
})
