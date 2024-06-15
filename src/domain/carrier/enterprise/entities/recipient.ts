import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface RecipientProps {
  name: string
  address: string
}

export class Recipient extends Entity<RecipientProps> {
  static create(props: RecipientProps, id?: UniqueEntityID) {
    const recipient = new Recipient({ ...props }, id)

    return recipient
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get address() {
    return this.props.address
  }

  set address(address: string) {
    this.props.address = address
  }
}
