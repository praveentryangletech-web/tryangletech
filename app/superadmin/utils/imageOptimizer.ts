/**
 * Client-Side Instant WebP Image Converter & Optimizer
 * Converts any image (PNG, JPG, JPEG, BMP, etc.) into high-quality .webp in-memory
 * 100% Free, 0 External API limits, 0 Server Latency, Instant conversion
 */

export async function convertFileToWebp(file: File, quality = 0.88): Promise<File> {
  // If it's an SVG, keep it as SVG (vector format)
  if (file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')) {
    return file;
  }

  // If not an image, return original
  if (!file.type.startsWith('image/')) {
    return file;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (readerEvent) => {
      const img = new Image();

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || img.width;
          canvas.height = img.naturalHeight || img.height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(file);
            return;
          }

          // Draw the original image onto the canvas
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Convert canvas to WebP Blob
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                resolve(file);
                return;
              }

              // Compute new .webp filename
              const lastDot = file.name.lastIndexOf('.');
              const baseName = lastDot !== -1 ? file.name.substring(0, lastDot) : file.name;
              const cleanBase = baseName
                .toLowerCase()
                .replace(/[^a-z0-9_-]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '') || 'image';

              const webpFile = new File([blob], `${cleanBase}.webp`, {
                type: 'image/webp',
                lastModified: Date.now(),
              });

              resolve(webpFile);
            },
            'image/webp',
            quality
          );
        } catch (err) {
          console.warn('[WebP Converter] Canvas conversion fallback:', err);
          resolve(file);
        }
      };

      img.onerror = () => {
        resolve(file);
      };

      if (readerEvent.target?.result) {
        img.src = readerEvent.target.result as string;
      } else {
        resolve(file);
      }
    };

    reader.onerror = () => {
      resolve(file);
    };

    reader.readAsDataURL(file);
  });
}
