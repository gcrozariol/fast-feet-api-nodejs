import { PaginationParams } from '@/core/repositories/pagination-params'
import { Recipient } from '@/domain/carrier/enterprise/entities/recipient'

export interface EditRecipientProps {
  name: string
  address: string
}
export interface RecipientsRepository {
  create(recipient: Recipient): Promise<void>
  findById(recipientId: string): Promise<Recipient | null>
  findMany(params: PaginationParams): Promise<Recipient[]>
  save(recipient: Recipient): Promise<void>
  delete(recipient: Recipient): Promise<void>
}
