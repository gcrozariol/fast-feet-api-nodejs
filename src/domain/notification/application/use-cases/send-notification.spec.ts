import { InMemoryNotificationsRepository } from '@test/repositories/in-memory/in-memory-notifications-repository'
import { SendNotificationUseCase } from './send-notification'

describe('Send Notification [USE CASE]', () => {
  it('should be able to send a notification', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository()
    const sut = new SendNotificationUseCase(inMemoryNotificationsRepository)

    const result = await sut.execute({
      recipientId: 'recipient-1',
      title: 'some title',
      content: 'some content',
    })

    expect(result.isRight()).toEqual(true)
    expect(inMemoryNotificationsRepository.items[0]).toEqual(
      result.value?.notification,
    )
  })
})
