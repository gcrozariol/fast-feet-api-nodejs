import { InMemoryCouriersRepository } from '@test/repositories/in-memory/in-memory-couriers-repository'
import { Courier } from '../../enterprise/entities/courier'

interface GetCourierByIdUseCaseRequest {
  courierId: string
}

interface GetCourierByIdUseCaseResponse {
  courier: Courier
}

export class GetCourierByIdUseCase {
  constructor(
    private readonly couriersRepository: InMemoryCouriersRepository,
  ) {}

  async execute({
    courierId,
  }: GetCourierByIdUseCaseRequest): Promise<GetCourierByIdUseCaseResponse> {
    const courier = await this.couriersRepository.findById(courierId)

    if (!courier) {
      throw new Error('Courier not found')
    }

    return { courier }
  }
}
