import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface CourierProps {
  name: string
  email: string
  admin: boolean
}

export class Courier extends Entity<CourierProps> {
  static create(props: CourierProps, id?: UniqueEntityID) {
    const courier = new Courier({ ...props }, id)

    return courier
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get email() {
    return this.props.email
  }

  get admin() {
    return this.props.admin
  }
}
