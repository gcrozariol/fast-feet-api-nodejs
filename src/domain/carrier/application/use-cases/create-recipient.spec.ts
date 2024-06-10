import { CreateRecipientUseCase } from './create-recipient'
import { InMemoryRecipientsRepository } from '@test/repositories/in-memory/in-memory-recipients-repository'

describe('Create Recipient [USE CASE]', () => {
  it('should be able to create an recipient', async () => {
    const recipientsRepository = new InMemoryRecipientsRepository()
    const sut = new CreateRecipientUseCase(recipientsRepository)

    const result = await sut.execute({
      name: 'John Doe',
      address: 'address',
    })

    expect(result.isRight()).toEqual(true)

    expect(result.value?.recipient.id).toBeTruthy()
    expect(result.value?.recipient.name).toEqual('John Doe')
    expect(result.value?.recipient.address).toEqual('address')
  })
})
