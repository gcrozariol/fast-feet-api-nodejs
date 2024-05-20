import { CourierRepository } from '../repositories/courier-repository'

interface DeleteCourierUseCaseRequest {
  courierId: string
}

interface DeleteCourierUseCaseResponse {}

export class DeleteCourierUseCase {
  constructor(private courierRepository: CourierRepository) {}

  async execute({
    courierId,
  }: DeleteCourierUseCaseRequest): Promise<DeleteCourierUseCaseResponse> {
    const courier = await this.courierRepository.findById(courierId)

    if (!courier) {
      throw new Error('Courier not found')
    }

    this.courierRepository.delete(courierId)

    return {}
  }
}
