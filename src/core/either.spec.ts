import { Either, left, right } from './either'

function doSomething(success: boolean): Either<string, number> {
  if (success) {
    return right(10)
  }

  return left('error')
}

describe('Either [CORE]', () => {
  it('should return a success result', () => {
    const result = doSomething(true)

    expect(result.isLeft()).toEqual(false)
    expect(result.isRight()).toEqual(true)

    expect(result.value).toBeTypeOf('number')
  })

  it('should return an error result', () => {
    const result = doSomething(false)

    expect(result.isLeft()).toEqual(true)
    expect(result.isRight()).toEqual(false)

    expect(result.value).toBeTypeOf('string')
  })
})
