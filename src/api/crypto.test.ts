import { describe, expect, it } from 'vitest'
import { decryptPayload, encryptPayload } from './crypto'

describe('AES-256-GCM response encryption/decryption', () => {
  it('encrypts and decrypts payload correctly', async () => {
    const data = {
      title: 'One Piece',
      episodes: [1, 2, 3],
      sources: [
        { label: 'HD-1', url: 'https://play.xtwap.top/cepat2.php?url=test1234' },
      ],
    }

    const encrypted = await encryptPayload(data)
    expect(typeof encrypted).toBe('string')
    expect(encrypted.length).toBeGreaterThan(30)

    const decrypted = await decryptPayload<typeof data>(encrypted)
    expect(decrypted).toEqual(data)
  })

  it('fails on corrupted payload', async () => {
    await expect(decryptPayload('invalid-base64-payload')).rejects.toThrow()
  })
})
