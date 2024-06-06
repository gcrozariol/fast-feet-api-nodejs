import { faker } from '@faker-js/faker'

import {
  Recipient,
  RecipientProps,
} from '@/domain/carrier/enterprise/entities/recipient'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export function makeRecipient(
  override: Partial<RecipientProps> = {},
  id?: UniqueEntityID,
) {
  const recipient = Recipient.create(
    {
      name: faker.person.firstName(),
      address: faker.person.firstName(),
      ...override,
    },
    id,
  )

  return recipient
}
