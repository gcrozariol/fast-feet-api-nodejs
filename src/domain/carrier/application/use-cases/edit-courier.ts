import { Courier } from '@/domain/carrier/enterprise/entities/courier'
import { InMemoryCouriersRepository } from '@test/repositories/in-memory/in-memory-couriers-repository'
import { EditCourierProps } from '../repositories/couriers-repository'

interface EditCourierUseCaseRequest {
  courierId: string
  props: EditCourierProps
}

interface EditCourierUseCaseResponse {
  courier: Courier
}

export class EditCourierUseCase {
  constructor(private couriersRepository: InMemoryCouriersRepository) {}

  async execute({
    courierId,
    props,
  }: EditCourierUseCaseRequest): Promise<EditCourierUseCaseResponse> {
    const courier = await this.couriersRepository.findById(courierId)

    if (!courier) {
      throw new Error('Courier not found')
    }

    Object.assign(courier, props)

    await this.couriersRepository.save(courier)

    return { courier }
  }
}
