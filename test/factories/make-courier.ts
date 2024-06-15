import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Courier,
  CourierProps,
} from '@/domain/carrier/enterprise/entities/courier'
import { faker } from '@faker-js/faker'

export function makeCourier(
  override: Partial<CourierProps> = {},
  id?: UniqueEntityID,
) {
  const courier = Courier.create(
    {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      ...override,
    },
    id,
  )

  return courier
}
