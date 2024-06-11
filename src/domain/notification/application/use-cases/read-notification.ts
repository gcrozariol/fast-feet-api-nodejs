import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/domain/carrier/application/use-cases/errors/resource-not-found-error'
import { NotificationsRepository } from '../repositories/notifications-repository'

interface ReadNotificationUseCaseRequest {
  notificationId: string
}

type ReadNotificationUseCaseResponse = Either<ResourceNotFoundError, {}>

export class ReadNotificationUseCase {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute({
    notificationId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification =
      await this.notificationsRepository.findById(notificationId)

    if (!notification) {
      return left(new ResourceNotFoundError())
    }

    notification.readAt = new Date()

    await this.notificationsRepository.create(notification)

    return right({})
  }
}
