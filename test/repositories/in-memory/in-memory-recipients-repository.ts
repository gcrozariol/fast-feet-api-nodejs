import { PaginationParams } from '@/core/repositories/pagination-params'
import { RecipientsRepository } from '@/domain/carrier/application/repositories/recipients-repository'
import { Recipient } from '@/domain/carrier/enterprise/entities/recipient'

export class InMemoryRecipientsRepository implements RecipientsRepository {
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

  async findMany(params: PaginationParams): Promise<Recipient[]> {
    const { page } = params

    return this.items.slice((page - 1) * 10, page * 10)
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
