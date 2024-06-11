import { UseCaseError } from '@/core/errors/use-case-error'

export class CourierAlreadyExistsError extends Error implements UseCaseError {
  constructor(email: string) {
    super(`Courier with email ${email} already exists.`)
  }
}
