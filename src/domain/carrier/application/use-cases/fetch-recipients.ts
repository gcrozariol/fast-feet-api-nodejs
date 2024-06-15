import { Either, right } from '@/core/either'
import { Recipient } from '../../enterprise/entities/recipient'
import { RecipientsRepository } from '../repositories/recipients-repository'

interface FetchRecipientsUseCaseRequest {
  page: number
}

type FetchRecipientsUseCaseResponse = Either<
  null,
  {
    recipients: Recipient[]
  }
>

export class FetchRecipientsUseCase {
  constructor(private readonly recipientRepository: RecipientsRepository) {}

  async execute({
    page,
  }: FetchRecipientsUseCaseRequest): Promise<FetchRecipientsUseCaseResponse> {
    const recipients = await this.recipientRepository.findMany({ page })

    return right({ recipients })
  }
}
