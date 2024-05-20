import { makeCourier } from 'test/factories/make-courier'
import { InMemoryCouriersRepository } from '@test/repositories/in-memory/in-memory-couriers-repository'
import { FetchCouriersUseCase } from './fetch-couriers'

let couriersRepository: InMemoryCouriersRepository
let sut: FetchCouriersUseCase

describe('Fetch Couriers [USE CASE]', () => {
  beforeEach(() => {
    couriersRepository = new InMemoryCouriersRepository()
    sut = new FetchCouriersUseCase(couriersRepository)
  })

  it('should be able to fetch couriers', async () => {
    for (let index = 0; index < 15; index++) {
      const courier = makeCourier()
      couriersRepository.create(courier)
    }

    const { couriers: couriersFirstPage } = await sut.execute({ page: 1 })
    expect(couriersFirstPage).toHaveLength(10)

    const { couriers: couriersSecondPage } = await sut.execute({ page: 2 })
    expect(couriersSecondPage).toHaveLength(5)
  })
})
