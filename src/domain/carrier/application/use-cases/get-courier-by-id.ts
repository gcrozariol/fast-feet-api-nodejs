import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { InMemoryCouriersRepository } from '@test/repositories/in-memory/in-memory-couriers-repository'
import { Courier } from '../../enterprise/entities/courier'

interface GetCourierByIdUseCaseRequest {
  courierId: string
}

type GetCourierByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    courier: Courier
  }
>

export class GetCourierByIdUseCase {
  constructor(
    private readonly couriersRepository: InMemoryCouriersRepository,
  ) {}

  async execute({
    courierId,
  }: GetCourierByIdUseCaseRequest): Promise<GetCourierByIdUseCaseResponse> {
    const courier = await this.couriersRepository.findById(courierId)

    if (!courier) {
      return left(new ResourceNotFoundError())
    }

    return right({ courier })
  }
}
