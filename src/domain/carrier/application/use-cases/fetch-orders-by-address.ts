import { Either, right } from '@/core/either'
import { Order } from '@/domain/carrier/enterprise/entities/order'
import { InMemoryOrdersRepository } from '@test/repositories/in-memory/in-memory-orders-repository'

interface FetchOrdersByAddressUseCaseRequest {
  address: string
  page: number
}

type FetchOrdersByAddressUseCaseResponse = Either<
  null,
  {
    orders: Order[]
  }
>
export class FetchOrdersByAddressUseCase {
  constructor(private readonly ordersRepository: InMemoryOrdersRepository) {}

  async execute({
    address,
    page,
  }: FetchOrdersByAddressUseCaseRequest): Promise<FetchOrdersByAddressUseCaseResponse> {
    const orders = await this.ordersRepository.fetchOrdersByAddress(address, {
      page,
    })

    return right({ orders })
  }
}
