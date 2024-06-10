import { Recipient } from '@/domain/carrier/enterprise/entities/recipient'
import { InMemoryRecipientsRepository } from '@test/repositories/in-memory/in-memory-recipients-repository'
import { EditRecipientProps } from '../repositories/recipients-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface EditRecipientUseCaseRequest {
  recipientId: string
  props: EditRecipientProps
}

type EditRecipientUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    recipient: Recipient
  }
>
export class EditRecipientUseCase {
  constructor(private recipientsRepository: InMemoryRecipientsRepository) {}

  async execute({
    recipientId,
    props,
  }: EditRecipientUseCaseRequest): Promise<EditRecipientUseCaseResponse> {
    const recipient = await this.recipientsRepository.findById(recipientId)

    if (!recipient) {
      return left(new ResourceNotFoundError())
    }

    Object.assign(recipient, props)

    await this.recipientsRepository.save(recipient)

    return right({ recipient })
  }
}
