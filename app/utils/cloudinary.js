/**
 * Optimize a Cloudinary image URL by inserting transformation parameters.
 * Non-Cloudinary URLs are returned unchanged.
 *
 * @param {string} url - The original image URL
 * @param {object} [options]
 * @param {number} [options.width]   - Desired width in pixels
 * @param {number} [options.height]  - Desired height in pixels
 * @param {string} [options.crop]    - Crop mode (default: "fill")
 * @param {string} [options.quality] - Quality setting (default: "auto")
 * @param {string} [options.format]  - Image format (default: "auto")
 * @returns {string} The optimized Cloudinary URL, or the original URL if not a Cloudinary URL
 *
 * @example
 * optimizeCloudinaryUrl("https://res.cloudinary.com/.../upload/v123/img.png", { width: 600, height: 400 })
 * // => "https://res.cloudinary.com/.../upload/w_600,h_400,c_fill,q_auto,f_auto/v123/img.png"
 */
export function optimizeCloudinaryUrl(
  url,
  { width, height, crop = "fill", quality = "auto", format = "auto" } = {},
) {
  if (!url || !url.includes("cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }

  const transforms = [];
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (crop) transforms.push(`c_${crop}`);
  if (quality) transforms.push(`q_${quality}`);
  if (format) transforms.push(`f_${format}`);

  if (transforms.length === 0) return url;

  const parts = url.split("/upload/");
  return `${parts[0]}/upload/${transforms.join(",")}/${parts[1]}`;
}
