import { Courier } from '../../enterprise/entities/courier'
import { CouriersRepository } from '../repositories/couriers-repository'

interface FetchCouriersUseCaseRequest {
  page: number
}

interface FetchCouriersUseCaseResponse {
  couriers: Courier[]
}

export class FetchCouriersUseCase {
  constructor(private readonly couriersRepository: CouriersRepository) {}

  async execute({
    page,
  }: FetchCouriersUseCaseRequest): Promise<FetchCouriersUseCaseResponse> {
    const couriers = await this.couriersRepository.findMany({ page })

    return { couriers }
  }
}
