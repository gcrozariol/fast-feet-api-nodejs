import { Order } from '@/domain/carrier/enterprise/entities/order'
import { InMemoryOrdersRepository } from '@test/repositories/in-memory/in-memory-orders-repository'

interface FetchOrdersByAddressUseCaseRequest {
  address: string
  page: number
}

interface FetchOrdersByAddressUseCaseResponse {
  orders: Order[]
}

export class FetchOrdersByAddressUseCase {
  constructor(private readonly ordersRepository: InMemoryOrdersRepository) {}

  async execute({
    address,
    page,
  }: FetchOrdersByAddressUseCaseRequest): Promise<FetchOrdersByAddressUseCaseResponse> {
    const orders = await this.ordersRepository.fetchOrdersByAddress(address, {
      page,
    })

    return { orders }
  }
}
