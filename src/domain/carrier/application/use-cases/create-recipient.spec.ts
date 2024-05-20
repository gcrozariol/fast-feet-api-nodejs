import { CreateRecipientUseCase } from './create-recipient'
import { InMemoryRecipientsRepository } from '@test/repositories/in-memory/in-memory-recipients-repository'

describe('Create Recipient [USE CASE]', () => {
  it('should be able to create an recipient', async () => {
    const recipientsRepository = new InMemoryRecipientsRepository()
    const sut = new CreateRecipientUseCase(recipientsRepository)

    const { recipient } = await sut.execute({
      name: 'John Doe',
      address: 'address',
    })

    const { id, name, address } = recipient

    expect(id).toBeTruthy()
    expect(name).toEqual('John Doe')
    expect(address).toEqual('address')
  })
})
