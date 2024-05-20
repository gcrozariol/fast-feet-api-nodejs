import { Recipient } from '../../enterprise/entities/recipient'
import { RecipientsRepository } from '../repositories/recipients-repository'

interface FetchRecipientsUseCaseRequest {
  page: number
}

interface FetchRecipientsUseCaseResponse {
  recipients: Recipient[]
}

export class FetchRecipientsUseCase {
  constructor(private readonly recipientRepository: RecipientsRepository) {}

  async execute({
    page,
  }: FetchRecipientsUseCaseRequest): Promise<FetchRecipientsUseCaseResponse> {
    const recipients = await this.recipientRepository.findMany({ page })

    return { recipients }
  }
}
