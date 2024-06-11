import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeRecipient } from '@test/factories/make-recipient'
import { InMemoryRecipientsRepository } from '@test/repositories/in-memory/in-memory-recipients-repository'
import { DeleteRecipientUseCase } from './delete-recipient'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryRecipientsRepository: InMemoryRecipientsRepository
let sut: DeleteRecipientUseCase

describe('Delete Recipient [USE CASE]', () => {
  beforeEach(() => {
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
    sut = new DeleteRecipientUseCase(inMemoryRecipientsRepository)
  })

  it('should be able to delete a recipient', async () => {
    const recipient = makeRecipient({}, new UniqueEntityID('recipient-1'))

    await inMemoryRecipientsRepository.create(recipient)

    const result = await sut.execute({ recipientId: 'recipient-1' })

    expect(result.isRight()).toEqual(true)
    expect(inMemoryRecipientsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete an inexistent recipient', async () => {
    const result = await sut.execute({ recipientId: 'recipient-1' })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
