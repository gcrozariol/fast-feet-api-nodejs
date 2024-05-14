import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface CourierProps {
  name: string
}

export class Courier extends Entity<CourierProps> {
  static create(props: CourierProps, id?: UniqueEntityID) {
    const courier = new Courier({ ...props }, id)

    return courier
  }
}
