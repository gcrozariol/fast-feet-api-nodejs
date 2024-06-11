import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeRecipient } from '@test/factories/make-recipient'
import { InMemoryRecipientsRepository } from '@test/repositories/in-memory/in-memory-recipients-repository'
import { EditRecipientUseCase } from './edit-recipient'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

describe('Edit Recipient [USE CASE]', () => {
  it('should be able to update a recipient name', async () => {
    const inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
    const sut = new EditRecipientUseCase(inMemoryRecipientsRepository)

    const recipient = makeRecipient({}, new UniqueEntityID('recipient-1'))

    await inMemoryRecipientsRepository.create(recipient)

    const result = await sut.execute({
      recipientId: 'recipient-1',
      props: {
        name: 'John Doe',
        address: 'New address',
      },
    })

    expect(result.isRight()).toEqual(true)

    expect(inMemoryRecipientsRepository.items[0]).toMatchObject({
      id: new UniqueEntityID('recipient-1'),
      name: 'John Doe',
      address: 'New address',
    })
  })

  it('should not be able to update an inexisten recipient', async () => {
    const inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
    const sut = new EditRecipientUseCase(inMemoryRecipientsRepository)

    const result = await sut.execute({
      recipientId: 'inexistent-recipient-1',
      props: {
        name: 'John Doe',
        address: 'New address',
      },
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
