// AES-256-GCM response decryptor using Web Crypto API.

const SECRET = (import.meta.env.VITE_API_SECRET as string | undefined) || 'nimeverse-secret-key-32bytes!!'

let cachedCryptoKey: Promise<CryptoKey> | null = null

async function getCryptoKey(usage: KeyUsage): Promise<CryptoKey> {
  const enc = new TextEncoder()
  const keyBuffer = await crypto.subtle.digest('SHA-256', enc.encode(SECRET))
  return crypto.subtle.importKey('raw', keyBuffer, { name: 'AES-GCM' }, false, [usage])
}

function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64)
  const len = binary.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

/**
 * Decrypts an AES-256-GCM response payload produced by the backend.
 * The input is a base64 string where the first 12 bytes are the random IV/nonce.
 */
export async function decryptPayload<T>(payloadBase64: string): Promise<T> {
  const raw = base64ToBytes(payloadBase64)
  if (raw.length < 12 + 16) {
    throw new Error('Payload too short for AES-GCM')
  }
  const iv = raw.subarray(0, 12)
  const data = raw.subarray(12)

  if (!cachedCryptoKey) {
    cachedCryptoKey = getCryptoKey('decrypt')
  }
  const key = await cachedCryptoKey

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  )
  const jsonStr = new TextDecoder().decode(decrypted)
  return JSON.parse(jsonStr) as T
}

/**
 * Encrypts data for testing or client-side payload encryption.
 */
export async function encryptPayload(data: unknown): Promise<string> {
  const jsonStr = JSON.stringify(data)
  const encoded = new TextEncoder().encode(jsonStr)
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const key = await getCryptoKey('encrypt')
  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoded
  )
  const encryptedBytes = new Uint8Array(encryptedBuffer)
  const combined = new Uint8Array(iv.length + encryptedBytes.length)
  combined.set(iv, 0)
  combined.set(encryptedBytes, iv.length)
  return bytesToBase64(combined)
}
