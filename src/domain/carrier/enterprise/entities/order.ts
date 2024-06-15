import dayjs from 'dayjs'

import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export enum Status {
  'READY_FOR_PICKUP' = 'READY_FOR_PICKUP',
  'EN_ROUTE' = 'EN_ROUTE',
  'DELIVERED' = 'DELIVERED',
}

export interface OrderProps {
  recipientId: UniqueEntityID
  courierId?: UniqueEntityID
  description: string
  address: string
  status: Status
  createdAt: Date
  updatedAt?: Date
  pickedUpAt?: Date
  deliveredAt?: Date
  returnedAt?: Date
  canceledAt?: Date
}

export class Order extends Entity<OrderProps> {
  static create(
    props: Optional<OrderProps, 'createdAt' | 'status'>,
    id?: UniqueEntityID,
  ) {
    const order = new Order(
      {
        status: Status.READY_FOR_PICKUP,
        createdAt: new Date(),
        ...props,
      },
      id,
    )

    return order
  }

  get recipientId() {
    return this.props.recipientId
  }

  get courierId() {
    return this.props.courierId
  }

  set courierId(courierId: UniqueEntityID | undefined) {
    this.props.courierId = courierId
  }

  get description() {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
  }

  get address() {
    return this.props.address
  }

  get status() {
    return this.props.status
  }

  set status(status: Status) {
    switch (status) {
      case Status.EN_ROUTE:
        this.props.pickedUpAt = new Date()
        break
      case Status.DELIVERED:
        this.props.deliveredAt = new Date()
        break
      default:
        break
    }

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
    this.props.updatedAt = new Date()
  }
}
