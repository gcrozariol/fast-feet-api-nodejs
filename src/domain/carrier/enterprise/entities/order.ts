import dayjs from 'dayjs'

import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export enum Status {
  'READY_FOR_PICKUP' = 'READY_FOR_PICKUP',
  'DELIVERED' = 'DELIVERED',
  'RETURNED' = 'RETURNED',
}

export interface OrderProps {
  recipientId: UniqueEntityID
  description: string
  address: string
  status: Status
  pickedUpAt?: Date
  deliveredAt?: Date
  returnedAt?: Date
  createdAt: Date
}

export class Order extends Entity<OrderProps> {
  static create(
    props: Optional<OrderProps, 'createdAt' | 'status'>,
    id?: UniqueEntityID,
  ) {
    const order = new Order(
      {
        ...props,
        status: Status.READY_FOR_PICKUP,
        createdAt: new Date(),
      },
      id,
    )

    return order
  }

  get recipientId() {
    return this.props.recipientId
  }

  get description() {
    return this.props.description
  }

  get address() {
    return this.props.address
  }

  get status() {
    return this.props.status
  }

  set status(status: Status) {
    this.props.status = status
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get pickedUpAt() {
    return this.props.pickedUpAt
  }

  get deliveredAt() {
    return this.props.deliveredAt
  }

  get returnedAt() {
    return this.props.returnedAt
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3
  }

  private touch() {
    this.props.createdAt = new Date()
  }
}
