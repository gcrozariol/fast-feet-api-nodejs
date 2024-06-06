import { CouriersRepository } from '../repositories/couriers-repository'

interface DeleteCourierUseCaseRequest {
  courierId: string
}

interface DeleteCourierUseCaseResponse {}

export class DeleteCourierUseCase {
  constructor(private couriersRepository: CouriersRepository) {}

  async execute({
    courierId,
  }: DeleteCourierUseCaseRequest): Promise<DeleteCourierUseCaseResponse> {
    const courier = await this.couriersRepository.findById(courierId)

    if (!courier) {
      throw new Error('Courier not found')
    }

    this.couriersRepository.delete(courier)

    return {}
  }
}
