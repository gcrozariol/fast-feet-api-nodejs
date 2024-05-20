import { Recipient } from '@/domain/carrier/enterprise/entities/recipient'

export interface RecipientsRepository {
  create(recipient: Recipient): Promise<void>
  findById(recipientId: string): Promise<Recipient | null>
  save(recipient: Recipient): Promise<void>
  delete(recipient: Recipient): Promise<void>
}
