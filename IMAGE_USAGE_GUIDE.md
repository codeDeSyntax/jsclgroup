# Image Data Usage Guide

## Overview

All images are organized in `data/images-structured.json` and accessed via utility functions in `lib/images.ts`.

## Data Structure

```
realEstate/
  ├── hero (1 image) - Large hero section image
  ├── properties (10 images) - Property listings/cards
  ├── featured (3 images) - Featured properties
  └── portfolio (9 images) - Project portfolio

travel/
  ├── hero (1 image) - Hero section
  ├── packages (3 images) - Travel packages
  ├── destinations (4 images) - Destination showcases
  └── accessories (3 images) - Travel gear

gadgets/
  ├── hero (1 image) - Hero section
  ├── phones (1 image) - Phone products
  ├── appliances (2 images) - Kitchen/home appliances
  ├── electronics (4 images) - General electronics
  ├── importExport (1 image) - Import/export services
  └── featured (2 images) - Featured products
```

## Image Metadata Included

- `id` - Unique identifier (access key)
- `url` / `secure_url` - Cloudinary URL
- `alt` - Alt text for accessibility
- `type` - Image purpose (hero, product-card, featured, etc.)
- `category` - Division name (real-estate, travel, gadgets)
- `subcategory` - Optional sub-category (phones, appliances, etc.)
- `width` / `height` - Dimensions for responsive design
- `publicId` - Cloudinary public ID

## Usage Examples

### 1. Import Images in Components

```tsx
import {
  getImagesByType,
  getImagesByDivision,
  getImageById,
} from "@/lib/images";

// Get all real estate properties
const properties = getImagesByType("realEstate", "properties");

// Get travel packages
const packages = getImagesByType("travel", "packages");

// Get all images for a division
const gadgetsDivision = getImagesByDivision("gadgets");

// Get specific image by ID
const heroImage = getImageById("re_prop_1");
```

### 2. Display Images in Components

```tsx
"use client";

import Image from "next/image";
import { getImagesByType } from "@/lib/images";

export default function RealEstateShowcase() {
  const properties = getImagesByType("realEstate", "properties").slice(0, 6);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {properties.map((img) => (
        <div key={img.id}>
          <Image
            src={img.secure_url}
            alt={img.alt}
            width={img.width}
            height={img.height}
            className="rounded-lg"
          />
        </div>
      ))}
    </div>
  );
}
```

### 3. Get Limited Images

```tsx
import { getLimitedImages } from "@/lib/images";

// Get only 4 featured real estate properties
const featuredProps = getLimitedImages("realEstate", "featured", 4);
```

### 4. Get Random Image

```tsx
import { getRandomImage } from "@/lib/images";

// Get a random travel package for inspiration
const randomPackage = getRandomImage("travel", "packages");
```

### 5. Quick Access Exports

```tsx
import {
  heroImages,
  featuredImages,
  realEstateImages,
  travelImages,
  gadgetsImages,
} from "@/lib/images";

// Direct access to common categories
const reHero = heroImages.realEstate[0];
const featuredGadgets = featuredImages.gadgets;
```

## Naming Convention for IDs

IDs follow pattern: `[division]_[type]_[number]`

Examples:

- `re_prop_1` - Real Estate Property 1
- `re_featured_2` - Real Estate Featured 2
- `travel_pkg_1` - Travel Package 1
- `gadgets_electronics_3` - Gadgets Electronics 3

## Image Types (For Filtering)

- `hero` - Full-width hero sections
- `property-card` - Property listing cards
- `featured` - Featured/showcase items
- `portfolio` - Portfolio/project showcases
- `package-card` - Travel/service packages
- `destination` - Travel destinations
- `accessory` - Accessories/gear
- `product-card` - Product listings
- `marketing` - Marketing materials
- `service` - Service descriptions

## Where to Use Images

### Real Estate Division

- **Hero** → `/real-estate` page hero section
- **Properties** → Property listing grids, carousel
- **Featured** → Homepage showcase section
- **Portfolio** → `/real-estate` projects section

### Travel Division

- **Hero** → `/travel` page hero section
- **Packages** → Travel packages section, cards
- **Destinations** → Destination showcase grid
- **Accessories** → Travel gear recommendations

### Gadgets Division

- **Hero** → `/gadgets` page hero section
- **Phones** → Phone products showcase
- **Appliances** → Kitchen/appliance section
- **Electronics** → General electronics grid
- **Featured** → Homepage electronics highlight

## Responsive Image Handling

All images include width/height for Next.js Image optimization:

```tsx
<Image
  src={image.secure_url}
  alt={image.alt}
  width={image.width}
  height={image.height}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="object-cover"
/>
```

## Best Practices

1. **Always use alt text** - Already included in data
2. **Use secure_url** - Serves over HTTPS
3. **Optimize dimensions** - Use Next.js Image component
4. **Lazy load images** - Next.js default behavior
5. **Group by category** - Use getImagesByType for organization
6. **Cache results** - Store in component state if fetching multiple times

## Adding New Images

To add new images:

1. Upload to Cloudinary (jclgroup/realEstate, jclgroup/travel, or jclgroup/goodsandservices)
2. Get the secure_url and details
3. Add to appropriate section in `images-structured.json`
4. Use same ID pattern: `[division]_[type]_[number]`
5. Include all metadata: alt, type, dimensions, exact publicId
