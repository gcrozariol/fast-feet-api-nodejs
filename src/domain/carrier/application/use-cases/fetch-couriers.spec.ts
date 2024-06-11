import { makeCourier } from '@test/factories/make-courier'
import { InMemoryCouriersRepository } from '@test/repositories/in-memory/in-memory-couriers-repository'
import { FetchCouriersUseCase } from './fetch-couriers'

let couriersRepository: InMemoryCouriersRepository
let sut: FetchCouriersUseCase

describe('Fetch Couriers [USE CASE]', () => {
  beforeEach(() => {
    couriersRepository = new InMemoryCouriersRepository()
    sut = new FetchCouriersUseCase(couriersRepository)
  })

  it('should be able to fetch couriers using pagination', async () => {
    for (let index = 0; index < 15; index++) {
      const courier = makeCourier()
      couriersRepository.create(courier)
    }

    const resultFirstPage = await sut.execute({ page: 1 })

    expect(resultFirstPage.isRight()).toEqual(true)
    expect(resultFirstPage.value?.couriers).toHaveLength(10)

    const resultSecondPage = await sut.execute({ page: 2 })

    expect(resultSecondPage.isRight()).toEqual(true)
    expect(resultSecondPage.value?.couriers).toHaveLength(5)
  })

  it('should return an empty list of couriers', async () => {
    const result = await sut.execute({ page: 1 })

    expect(result.isRight()).toEqual(true)
    expect(result.value?.couriers).toHaveLength(0)
  })
})
