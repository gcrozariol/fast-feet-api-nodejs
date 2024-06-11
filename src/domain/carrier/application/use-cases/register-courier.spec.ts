import { makeCourier } from '@test/factories/make-courier'
import { InMemoryCouriersRepository } from '@test/repositories/in-memory/in-memory-couriers-repository'
import { CourierAlreadyExistsError } from './errors/courier-already-exists-error'
import { RegisterCourierUseCase } from './register-courier'

let inMemoryCouriersRepository: InMemoryCouriersRepository
let sut: RegisterCourierUseCase

describe('Register Courier [USE CASE]', () => {
  beforeEach(() => {
    inMemoryCouriersRepository = new InMemoryCouriersRepository()
    sut = new RegisterCourierUseCase(inMemoryCouriersRepository)
  })

  it('should be able to register a courier', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
    })

    expect(result.isRight()).toEqual(true)
    expect(inMemoryCouriersRepository.items[0].name).toEqual('John Doe')
    expect(inMemoryCouriersRepository.items[0].email).toEqual(
      'johndoe@example.com',
    )
    expect(inMemoryCouriersRepository.items[0].admin).toEqual(false)
  })

  it('should be able to register an admin courier', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      admin: true,
    })

    expect(result.isRight()).toEqual(true)
    expect(inMemoryCouriersRepository.items[0].name).toEqual('John Doe')
    expect(inMemoryCouriersRepository.items[0].email).toEqual(
      'johndoe@example.com',
    )
    expect(inMemoryCouriersRepository.items[0].admin).toEqual(true)
  })

  it('should not be able to register a courier with existing email', async () => {
    const courier = makeCourier({ email: 'johndoe@example.com' })

    await inMemoryCouriersRepository.create(courier)

    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(CourierAlreadyExistsError)
  })
})
