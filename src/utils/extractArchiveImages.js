import { unzip } from 'fflate'

const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg']

/**
 * Extract image files from a ZIP archive blob
 * @param {Blob} blob - The ZIP archive blob
 * @returns {Promise<{ name: string, blob: Blob, url: string }[]>} Array of objects with { name, blob, url }
 */
export async function extractArchiveImages(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      const uint8Array = new Uint8Array(event.target.result)

      unzip(uint8Array, (err, data) => {
        if (err) {
          reject(err)
          return
        }

        // Filter and process image files
        const imageFiles = Object.entries(data)
          .filter(([filename]) => {
            // Skip directories and non-image files
            if (filename.endsWith('/')) return false
            const ext = filename.split('.').pop().toLowerCase()
            return imageExtensions.includes(ext)
          })
          .map(([filename, uint8arr]) => {
            const ext = filename.split('.').pop().toLowerCase()
            const imageBlob = new Blob([uint8arr], { type: `image/${ext}` })
            return {
              name: filename,
              blob: imageBlob,
              url: URL.createObjectURL(imageBlob),
            }
          })
          .sort((a, b) => a.name.localeCompare(b.name))

        resolve(imageFiles)
      })
    }

    reader.onerror = () => {
      reject(reader.error)
    }

    reader.readAsArrayBuffer(blob)
  })
}
