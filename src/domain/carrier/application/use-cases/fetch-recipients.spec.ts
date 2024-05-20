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

    const { recipients: recipientsFirstPage } = await sut.execute({ page: 1 })
    expect(recipientsFirstPage).toHaveLength(10)

    const { recipients: recipientsSecondPage } = await sut.execute({ page: 2 })
    expect(recipientsSecondPage).toHaveLength(5)
  })

  it('should return an empty list of recipients', async () => {
    const { recipients } = await sut.execute({ page: 1 })

    expect(recipients).toHaveLength(0)
  })
})
