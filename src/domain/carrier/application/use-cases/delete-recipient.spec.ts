import { makeRecipient } from '@test/factories/make-recipient'
import { DeleteRecipientUseCase } from './delete-recipient'
import { InMemoryRecipientsRepository } from 'test/repositories/in-memory/in-memory-recipients-repository'

describe('Delete Recipient [USE CASE]', () => {
  it('should be able to delete an recipient', async () => {
    const inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
    const sut = new DeleteRecipientUseCase(inMemoryRecipientsRepository)

    const recipient = makeRecipient()

    await inMemoryRecipientsRepository.create(recipient)
    expect(inMemoryRecipientsRepository.items).toHaveLength(1)

    await sut.execute({ recipientId: recipient.id.toString() })
    expect(inMemoryRecipientsRepository.items).toHaveLength(0)
  })
})
