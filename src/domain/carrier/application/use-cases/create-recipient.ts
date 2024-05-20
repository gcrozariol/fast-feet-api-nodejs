import { Recipient } from '../../enterprise/entities/recipient'
import { RecipientsRepository } from '../repositories/recipients-repository'

interface CreateRecipientUseCaseRequest {
  name: string
  address: string
}

interface CreateRecipientUseCaseResponse {
  recipient: Recipient
}

export class CreateRecipientUseCase {
  constructor(private readonly recipientsRepository: RecipientsRepository) {}

  async execute({
    name,
    address,
  }: CreateRecipientUseCaseRequest): Promise<CreateRecipientUseCaseResponse> {
    const recipient = Recipient.create({ name, address })

    this.recipientsRepository.create(recipient)

    return {
      recipient,
    }
  }
}
