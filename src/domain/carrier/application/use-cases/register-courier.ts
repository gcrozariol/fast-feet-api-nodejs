import { Either, left, right } from '@/core/either'
import { Courier } from '../../enterprise/entities/courier'
import { CouriersRepository } from '../repositories/couriers-repository'
import { CourierAlreadyExistsError } from './errors/courier-already-exists-error'

interface RegisterCourierUseCaseRequest {
  name: string
  email: string
  admin?: boolean
}

type RegisterCourierUseCaseResponse = Either<
  CourierAlreadyExistsError,
  {
    courier: Courier
  }
>

export class RegisterCourierUseCase {
  constructor(private readonly couriersRepository: CouriersRepository) {}

  async execute({
    name,
    email,
    admin = false,
  }: RegisterCourierUseCaseRequest): Promise<RegisterCourierUseCaseResponse> {
    const courierExists = await this.couriersRepository.findByEmail(email)

    if (courierExists) {
      return left(new CourierAlreadyExistsError(email))
    }

    const courier = Courier.create({ name, email, admin })

    this.couriersRepository.create(courier)

    return right({ courier })
  }
}
