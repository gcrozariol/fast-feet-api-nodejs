import { Either, left, right } from '@/core/either'
import { CouriersRepository } from '../repositories/couriers-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteCourierUseCaseRequest {
  courierId: string
}

type DeleteCourierUseCaseResponse = Either<ResourceNotFoundError, {}>

export class DeleteCourierUseCase {
  constructor(private couriersRepository: CouriersRepository) {}

  async execute({
    courierId,
  }: DeleteCourierUseCaseRequest): Promise<DeleteCourierUseCaseResponse> {
    const courier = await this.couriersRepository.findById(courierId)

    if (!courier) {
      return left(new ResourceNotFoundError())
    }

    this.couriersRepository.delete(courier)

    return right({})
  }
}
