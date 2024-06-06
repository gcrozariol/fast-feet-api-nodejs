import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order, OrderProps } from '@/domain/carrier/enterprise/entities/order'

export function makeOrder(
  override: Partial<OrderProps> = {},
  id?: UniqueEntityID,
) {
  const order = Order.create(
    {
      recipientId: new UniqueEntityID(),
      address: faker.location.streetAddress(),
      description: faker.lorem.paragraph(),
      ...override,
    },
    id,
  )

  return order
}
