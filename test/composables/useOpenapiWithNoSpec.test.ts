import { describe, expect, it } from 'vitest'
import { useOpenapi } from './src/composables/useOpenapi'

describe('useOpenapi with no spec', () => {
  const openapi = useOpenapi()

  it('returns null for getOperation when paths are not defined', () => {
    const result = openapi.getOperation('someOperationId')
    expect(result).toBeNull()
  })

  it('returns null for getOperationPath when paths are not defined', () => {
    const result = openapi.getOperationPath('someOperationId')
    expect(result).toBeNull()
  })

  it('returns empty array for getOperationParameters when operation is not found', () => {
    const result = openapi.getOperationParameters('someOperationId')
    expect(result).toEqual([])
  })

  it('returns empty string for getBaseUrl when servers are not defined', () => {
    const result = openapi.getBaseUrl()
    expect(result).toBe('')
  })

  it('returns empty object for getSchemas when components are not defined', () => {
    const result = openapi.getSchemas()
    expect(result).toEqual({})
  })

  it('returns empty array for getTags when paths are not defined', () => {
    const result = openapi.getTags()
    expect(result).toEqual([])
  })

  it('returns empty array for getOperationCodeSamples when operation is not found', () => {
    const result = openapi.getOperationCodeSamples('someOperationId')
    expect(result).toEqual([])
  })
})