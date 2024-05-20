import { Courier } from '../../enterprise/entities/courier'
import { CourierRepository } from '../repositories/courier-repository'

interface CreateCourierUseCaseRequest {
  name: string
}

interface CreateCourierUseCaseResponse {
  courier: Courier
}

export class CreateCourierUseCase {
  constructor(private readonly courierRepository: CourierRepository) {}

  async execute({
    name,
  }: CreateCourierUseCaseRequest): Promise<CreateCourierUseCaseResponse> {
    const courier = Courier.create({ name })

    this.courierRepository.create(courier)

    return {
      courier,
    }
  }
}
