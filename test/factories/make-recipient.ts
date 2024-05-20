import { faker } from '@faker-js/faker'

import {
  Recipient,
  RecipientProps,
} from '@/domain/carrier/enterprise/entities/recipient'

export function makeRecipient(override: Partial<RecipientProps> = {}) {
  const recipient = Recipient.create({
    name: faker.person.firstName(),
    address: faker.person.firstName(),
    ...override,
  })

  return recipient
}
