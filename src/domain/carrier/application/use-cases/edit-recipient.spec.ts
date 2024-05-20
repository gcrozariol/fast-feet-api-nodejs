import { EditRecipientUseCase } from './edit-recipient'
import { makeRecipient } from '@test/factories/make-recipient'
import { InMemoryRecipientsRepository } from 'test/repositories/in-memory/in-memory-recipients-repository'

describe('Edit Recipient [USE CASE]', () => {
  it('should be able to update a recipient name', async () => {
    const inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
    const sut = new EditRecipientUseCase(inMemoryRecipientsRepository)

    const recipient = makeRecipient()

    await inMemoryRecipientsRepository.create(recipient)

    const { recipient: updatedRecipient } = await sut.execute({
      recipientId: recipient.id.toString(),
      props: {
        name: 'John Doe',
        address: 'New address',
      },
    })

    expect(updatedRecipient.id).toBeTruthy()
    expect(updatedRecipient.name).toEqual('John Doe')
    expect(updatedRecipient.address).toEqual('New address')
  })
})
