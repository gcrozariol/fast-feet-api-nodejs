import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeNotification } from '@test/factories/make-notification'
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory/in-memory-notifications-repository'
import { ReadNotificationUseCase } from './read-notification'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: ReadNotificationUseCase

describe('Read Notification [USE CASE]', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('should be able to read a notification', async () => {
    const notification = makeNotification(
      {},
      new UniqueEntityID('notification-1'),
    )

    await inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      notificationId: 'notification-1',
    })

    expect(result.isRight()).toEqual(true)
  })

  it('should not be able to read an inexistent notification', async () => {
    const result = await sut.execute({
      notificationId: 'notification-1',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
