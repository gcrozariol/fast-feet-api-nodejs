import { makeRecipient } from 'test/factories/make-recipient'
import { InMemoryRecipientsRepository } from '@test/repositories/in-memory/in-memory-recipients-repository'
import { FetchRecipientsUseCase } from './fetch-recipients'

let recipientsRepository: InMemoryRecipientsRepository
let sut: FetchRecipientsUseCase

describe('Fetch Recipients [USE CASE]', () => {
  beforeEach(() => {
    recipientsRepository = new InMemoryRecipientsRepository()
    sut = new FetchRecipientsUseCase(recipientsRepository)
  })

  it('should be able to fetch recipients using pagination', async () => {
    for (let index = 0; index < 15; index++) {
      const recipient = makeRecipient()
      recipientsRepository.create(recipient)
    }

    const resultFirstPage = await sut.execute({ page: 1 })

    expect(resultFirstPage.isRight()).toEqual(true)
    expect(resultFirstPage.value?.recipients).toHaveLength(10)

    const resultSecondPage = await sut.execute({ page: 2 })

    expect(resultSecondPage.isRight()).toEqual(true)
    expect(resultSecondPage.value?.recipients).toHaveLength(5)
  })

  it('should return an empty list of recipients', async () => {
    const result = await sut.execute({ page: 1 })

    expect(result.isRight()).toEqual(true)
    expect(result.value?.recipients).toHaveLength(0)
  })
})
