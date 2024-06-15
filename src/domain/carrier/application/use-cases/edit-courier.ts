import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Courier } from '@/domain/carrier/enterprise/entities/courier'
import { InMemoryCouriersRepository } from '@test/repositories/in-memory/in-memory-couriers-repository'
import { EditCourierProps } from '../repositories/couriers-repository'

interface EditCourierUseCaseRequest {
  courierId: string
  props: EditCourierProps
}

type EditCourierUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    courier: Courier
  }
>

export class EditCourierUseCase {
  constructor(private couriersRepository: InMemoryCouriersRepository) {}

  async execute({
    courierId,
    props,
  }: EditCourierUseCaseRequest): Promise<EditCourierUseCaseResponse> {
    const courier = await this.couriersRepository.findById(courierId)

    if (!courier) {
      return left(new ResourceNotFoundError())
    }

    Object.assign(courier, props)

    await this.couriersRepository.save(courier)

    return right({ courier })
  }
}
