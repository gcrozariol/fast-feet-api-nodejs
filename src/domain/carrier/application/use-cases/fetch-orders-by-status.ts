import { Order, Status } from '@/domain/carrier/enterprise/entities/order'
import { InMemoryOrdersRepository } from '@test/repositories/in-memory/in-memory-orders-repository'

interface FetchOrdersByStatusUseCaseRequest {
  status: Status
  page: number
}

interface FetchOrdersByStatusUseCaseResponse {
  orders: Order[]
}

export class FetchOrdersByStatusUseCase {
  constructor(private readonly ordersRepository: InMemoryOrdersRepository) {}

  async execute({
    status,
    page,
  }: FetchOrdersByStatusUseCaseRequest): Promise<FetchOrdersByStatusUseCaseResponse> {
    const orders = await this.ordersRepository.fetchOrdersByStatus(status, {
      page,
    })

    return { orders }
  }
}
