// images data access utility - use this to fetch images throughout the app
import imagesData from "../data/images-structured.json";

export type ImageType =
  | "hero"
  | "property-card"
  | "featured"
  | "portfolio"
  | "package-card"
  | "destination"
  | "accessory"
  | "product-card"
  | "marketing"
  | "service";
export type Division = "realEstate" | "travel" | "gadgets";

export interface ImageData {
  id: string;
  url: string;
  secure_url: string;
  alt: string;
  type: ImageType;
  category: string;
  subcategory?: string;
  width: number;
  height: number;
  publicId: string;
}

/**
 * Get all images for a specific division
 * @param division - 'realEstate' | 'travel' | 'gadgets'
 * @returns All images grouped by category for that division
 */
export const getImagesByDivision = (division: Division) => {
  return imagesData[division] || {};
};

/**
 * Get a specific image type within a division
 * @param division - 'realEstate' | 'travel' | 'gadgets'
 * @param type - e.g., 'hero', 'properties', 'packages', 'featured', etc.
 * @returns Array of images for that specific type
 */
export const getImagesByType = (
  division: Division,
  type: string,
): ImageData[] => {
  const divisionData = imagesData[division];
  return (
    (divisionData?.[type as keyof typeof divisionData] as ImageData[]) || []
  );
};

/**
 * Get a random image from a specific category
 * @param division - 'realEstate' | 'travel' | 'gadgets'
 * @param type - e.g., 'properties', 'packages'
 * @returns A random image from that category
 */
export const getRandomImage = (
  division: Division,
  type: string,
): ImageData | null => {
  const images = getImagesByType(division, type);
  if (images.length === 0) return null;
  return images[Math.floor(Math.random() * images.length)];
};

/**
 * Get a specific image by ID
 * @param id - image id (e.g., 're_prop_1', 'travel_pkg_1')
 * @returns The image object or null if not found
 */
export const getImageById = (id: string): ImageData | null => {
  for (const division in imagesData) {
    const divData = imagesData[division as Division];
    for (const category in divData) {
      const images = divData[category as keyof typeof divData] as ImageData[];
      const found = images.find((img) => img.id === id);
      if (found) return found;
    }
  }
  return null;
};

/**
 * Get first N images from a category
 * @param division - 'realEstate' | 'travel' | 'gadgets'
 * @param type - category type
 * @param count - number of images to return
 * @returns Limited array of images
 */
export const getLimitedImages = (
  division: Division,
  type: string,
  count: number,
): ImageData[] => {
  const images = getImagesByType(division, type);
  return images.slice(0, count);
};

/**
 * Get all images of a specific image type across all divisions
 * @param imageType - e.g., 'hero', 'featured'
 * @returns Array of all matching images
 */
export const getImagesByImageType = (imageType: ImageType): ImageData[] => {
  const results: ImageData[] = [];
  for (const division in imagesData) {
    const divData = imagesData[division as Division];
    for (const category in divData) {
      const images = divData[category as keyof typeof divData] as ImageData[];
      results.push(...images.filter((img) => img.type === imageType));
    }
  }
  return results;
};

// Direct exports for convenience
export { imagesData };

// Named exports for each division
export const realEstateImages = imagesData.realEstate;
export const travelImages = imagesData.travel;
export const gadgetsImages = imagesData.gadgets;

// Common queries
export const heroImages = {
  realEstate: realEstateImages.hero,
  travel: travelImages.hero,
  gadgets: gadgetsImages.hero,
};

export const featuredImages = {
  realEstate: realEstateImages.featured,
  gadgets: gadgetsImages.featured,
};

export const allDivisionImages = {
  realEstate: realEstateImages,
  travel: travelImages,
  gadgets: gadgetsImages,
};
