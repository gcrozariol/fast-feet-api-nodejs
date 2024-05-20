import { faker } from '@faker-js/faker'

import {
  Courier,
  CourierProps,
} from '@/domain/carrier/enterprise/entities/courier'

export function makeCourier(override: Partial<CourierProps> = {}) {
  const courier = Courier.create({
    name: faker.person.firstName(),
    ...override,
  })

  return courier
}
