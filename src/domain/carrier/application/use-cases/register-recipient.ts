import { Either, right } from '@/core/either'
import { Recipient } from '../../enterprise/entities/recipient'
import { RecipientsRepository } from '../repositories/recipients-repository'

interface RegisterRecipientUseCaseRequest {
  name: string
  address: string
}

type RegisterRecipientUseCaseResponse = Either<
  null,
  {
    recipient: Recipient
  }
>

export class RegisterRecipientUseCase {
  constructor(private readonly recipientsRepository: RecipientsRepository) {}

  async execute({
    name,
    address,
  }: RegisterRecipientUseCaseRequest): Promise<RegisterRecipientUseCaseResponse> {
    const recipient = Recipient.create({ name, address })

    this.recipientsRepository.create(recipient)

    return right({
      recipient,
    })
  }
}
