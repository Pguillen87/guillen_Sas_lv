// Server-side encryption utilities for Edge Functions
// Using Web Crypto API (available in Deno runtime)

const ENCRYPTION_KEY = Deno.env.get("ENCRYPTION_KEY") || "";

/**
 * Convert string key to CryptoKey for AES-GCM
 */
async function getKeyMaterial(): Promise<CryptoKey> {
  if (!ENCRYPTION_KEY) {
    throw new Error("ENCRYPTION_KEY environment variable not set");
  }

  // Convert hex string to ArrayBuffer
  const keyBuffer = new Uint8Array(
    ENCRYPTION_KEY.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
  );

  return await crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export const encryption = {
  /**
   * Encrypt data using AES-256-GCM
   */
  async encrypt(plaintext: string): Promise<string> {
    try {
      const key = await getKeyMaterial();
      const iv = crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV for GCM
      const encoder = new TextEncoder();
      const data = encoder.encode(plaintext);

      const encrypted = await crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv: iv,
        },
        key,
        data
      );

      // Combine IV + encrypted data and encode as base64
      const combined = new Uint8Array(iv.length + encrypted.byteLength);
      combined.set(iv);
      combined.set(new Uint8Array(encrypted), iv.length);

      return btoa(String.fromCharCode(...combined));
    } catch (error) {
      console.error("Encryption error:", error);
      throw new Error("Failed to encrypt data");
    }
  },

  /**
   * Decrypt data using AES-256-GCM
   */
  async decrypt(ciphertext: string): Promise<string> {
    try {
      const key = await getKeyMaterial();
      const combined = Uint8Array.from(
        atob(ciphertext),
        (c) => c.charCodeAt(0)
      );

      // Extract IV (first 12 bytes) and encrypted data
      const iv = combined.slice(0, 12);
      const encrypted = combined.slice(12);

      const decrypted = await crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: iv,
        },
        key,
        encrypted
      );

      const decoder = new TextDecoder();
      return decoder.decode(decrypted);
    } catch (error) {
      console.error("Decryption error:", error);
      throw new Error("Failed to decrypt data");
    }
  },
};

