import { Either, right } from '@/core/either'
import { Courier } from '../../enterprise/entities/courier'
import { CouriersRepository } from '../repositories/couriers-repository'

interface CreateCourierUseCaseRequest {
  name: string
}

type CreateCourierUseCaseResponse = Either<
  null,
  {
    courier: Courier
  }
>

export class CreateCourierUseCase {
  constructor(private readonly couriersRepository: CouriersRepository) {}

  async execute({
    name,
  }: CreateCourierUseCaseRequest): Promise<CreateCourierUseCaseResponse> {
    const courier = Courier.create({ name })

    this.couriersRepository.create(courier)

    return right({ courier })
  }
}
