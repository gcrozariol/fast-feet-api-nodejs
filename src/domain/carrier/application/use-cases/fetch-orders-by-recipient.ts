import { Order } from '@/domain/carrier/enterprise/entities/order'
import { InMemoryOrdersRepository } from '@test/repositories/in-memory/in-memory-orders-repository'

interface FetchOrdersByRecipientUseCaseRequest {
  recipientId: string
  page: number
}

interface FetchOrdersByRecipientUseCaseResponse {
  orders: Order[]
}

export class FetchOrdersByRecipientUseCase {
  constructor(private readonly ordersRepository: InMemoryOrdersRepository) {}

  async execute({
    recipientId,
    page,
  }: FetchOrdersByRecipientUseCaseRequest): Promise<FetchOrdersByRecipientUseCaseResponse> {
    const orders = await this.ordersRepository.fetchOrdersByRecipient(
      recipientId,
      {
        page,
      },
    )

    return { orders }
  }
}
