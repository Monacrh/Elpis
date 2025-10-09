// src/utils/cloudinary.ts

/**
 * Cloudinary Image Transformation Helper
 * Mengoptimasi gambar dengan berbagai transformasi
 */

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'scale' | 'crop' | 'thumb';
  quality?: 'auto' | number;
  format?: 'auto' | 'webp' | 'jpg' | 'png';
  gravity?: 'auto' | 'face' | 'center';
}

/**
 * Generate Cloudinary URL dengan transformasi
 */
export function getCloudinaryUrl(
  url: string,
  options: CloudinaryTransformOptions = {}
): string {
  if (!url || !url.includes('cloudinary.com')) {
    return url; // Return original jika bukan Cloudinary URL
  }

  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
    gravity = 'auto',
  } = options;

  // Parse URL untuk inject transformasi
  const transformations: string[] = [];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop) transformations.push(`c_${crop}`);
  if (gravity && crop === 'fill') transformations.push(`g_${gravity}`);
  transformations.push(`q_${quality}`);
  transformations.push(`f_${format}`);

  const transformStr = transformations.join(',');

  // Replace /upload/ dengan /upload/{transformations}/
  return url.replace('/upload/', `/upload/${transformStr}/`);
}

/**
 * Preset transformations untuk berbagai kebutuhan
 */
export const CloudinaryPresets = {
  // Untuk thumbnail di card
  thumbnail: (url: string) =>
    getCloudinaryUrl(url, {
      width: 400,
      height: 400,
      crop: 'fill',
      quality: 'auto',
      format: 'auto',
    }),

  // Untuk gambar di detail page
  detail: (url: string) =>
    getCloudinaryUrl(url, {
      width: 1200,
      height: 800,
      crop: 'fit',
      quality: 'auto',
      format: 'auto',
    }),

  // Untuk gallery thumbnails
  galleryThumb: (url: string) =>
    getCloudinaryUrl(url, {
      width: 150,
      height: 150,
      crop: 'thumb',
      gravity: 'auto',
      quality: 'auto',
      format: 'auto',
    }),

  // Untuk hero/banner images
  hero: (url: string) =>
    getCloudinaryUrl(url, {
      width: 1920,
      height: 600,
      crop: 'fill',
      gravity: 'auto',
      quality: 'auto',
      format: 'auto',
    }),

  // Untuk avatar/profile pictures
  avatar: (url: string) =>
    getCloudinaryUrl(url, {
      width: 200,
      height: 200,
      crop: 'thumb',
      gravity: 'face',
      quality: 'auto',
      format: 'auto',
    }),
};

/**
 * Component helper untuk responsive images
 */
export function getResponsiveImageSet(url: string) {
  return {
    small: getCloudinaryUrl(url, { width: 400 }),
    medium: getCloudinaryUrl(url, { width: 800 }),
    large: getCloudinaryUrl(url, { width: 1200 }),
    xlarge: getCloudinaryUrl(url, { width: 1920 }),
  };
}

/**
 * Generate srcset untuk responsive images
 */
export function generateSrcSet(url: string): string {
  const sizes = [400, 800, 1200, 1920];
  return sizes
    .map((size) => `${getCloudinaryUrl(url, { width: size })} ${size}w`)
    .join(', ');
}

/**
 * Contoh penggunaan di component:
 * 
 * import { CloudinaryPresets, generateSrcSet } from '@/utils/cloudinary';
 * 
 * // Untuk thumbnail
 * <img src={CloudinaryPresets.thumbnail(imageUrl)} alt="..." />
 * 
 * // Untuk responsive image
 * <img 
 *   srcSet={generateSrcSet(imageUrl)}
 *   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
 *   src={CloudinaryPresets.detail(imageUrl)}
 *   alt="..."
 * />
 */