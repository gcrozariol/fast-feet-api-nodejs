import { Recipient } from '@/domain/carrier/enterprise/entities/recipient'
import { InMemoryRecipientsRepository } from '@test/repositories/in-memory/in-memory-recipients-repository'
import { EditRecipientProps } from '../repositories/recipients-repository'

interface EditRecipientUseCaseRequest {
  recipientId: string
  props: EditRecipientProps
}

interface EditRecipientUseCaseResponse {
  recipient: Recipient
}

export class EditRecipientUseCase {
  constructor(private recipientsRepository: InMemoryRecipientsRepository) {}

  async execute({
    recipientId,
    props,
  }: EditRecipientUseCaseRequest): Promise<EditRecipientUseCaseResponse> {
    const recipient = await this.recipientsRepository.findById(recipientId)

    if (!recipient) {
      throw new Error('Recipient not found')
    }

    Object.assign(recipient, props)

    await this.recipientsRepository.save(recipient)

    return { recipient }
  }
}
