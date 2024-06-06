import { makeRecipient } from '@test/factories/make-recipient'
import { DeleteRecipientUseCase } from './delete-recipient'
import { InMemoryRecipientsRepository } from 'test/repositories/in-memory/in-memory-recipients-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

describe('Delete Recipient [USE CASE]', () => {
  it('should be able to delete an recipient', async () => {
    const inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
    const sut = new DeleteRecipientUseCase(inMemoryRecipientsRepository)

    const recipient = makeRecipient({}, new UniqueEntityID('recipient-1'))

    await inMemoryRecipientsRepository.create(recipient)
    expect(inMemoryRecipientsRepository.items).toHaveLength(1)

    await sut.execute({ recipientId: 'recipient-1' })
    expect(inMemoryRecipientsRepository.items).toHaveLength(0)
  })
})
