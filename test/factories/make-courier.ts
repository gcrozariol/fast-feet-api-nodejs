import { faker } from '@faker-js/faker'

import {
  Courier,
  CourierProps,
} from '@/domain/carrier/enterprise/entities/courier'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export function makeCourier(
  override: Partial<CourierProps> = {},
  id?: UniqueEntityID,
) {
  const courier = Courier.create(
    {
      name: faker.person.firstName(),
      ...override,
    },
    id,
  )

  return courier
}
