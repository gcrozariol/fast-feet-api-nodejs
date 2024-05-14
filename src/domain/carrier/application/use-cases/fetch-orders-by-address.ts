import { Order } from '@/domain/carrier/enterprise/entities/order'
import { InMemoryOrdersRepository } from '../repositories/in-memory/in-memory-orders-repository'

interface FetchOrdersByAddressUseCaseRequest {
  address: string
}

interface FetchOrdersByAddressUseCaseResponse {
  orders: Order[]
}

export class FetchOrdersByAddressUseCase {
  constructor(private readonly ordersRepository: InMemoryOrdersRepository) {}

  async execute({
    address,
  }: FetchOrdersByAddressUseCaseRequest): Promise<FetchOrdersByAddressUseCaseResponse> {
    const orders = await this.ordersRepository.fetchOrdersByAddress(address)

    return { orders }
  }
}
