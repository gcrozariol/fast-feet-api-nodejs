import { RecipientsRepository } from '@/domain/carrier/application/repositories/recipients-repository'
import { Recipient } from '@/domain/carrier/enterprise/entities/recipient'

export class InMemoryRecipientRepository implements RecipientsRepository {
  public items: Recipient[] = []

  async create(recipient: Recipient): Promise<void> {
    this.items.push(recipient)
  }

  async findById(recipientId: string): Promise<Recipient | null> {
    const recipient = this.items.find(
      (item) => item.id.toString() === recipientId,
    )

    if (!recipient) {
      return null
    }

    return recipient
  }

  async save(recipient: Recipient): Promise<void> {
    const recipientIndex = this.items.findIndex(
      (item) => item.id === recipient.id,
    )

    this.items[recipientIndex] = recipient
  }

  async delete(recipient: Recipient): Promise<void> {
    const recipientIndex = this.items.findIndex(
      (item) => item.id === recipient.id,
    )

    this.items.splice(recipientIndex, 1)
  }
}
