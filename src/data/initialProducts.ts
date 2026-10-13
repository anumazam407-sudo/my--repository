import { Product, ProductReview } from '../types';

import heroMallImg from '../assets/images/hero_pakistani_couture_mall_1791437703357.jpg';
import festiveChiffonImg from '../assets/images/festive_eid_chiffon_1791437722533.jpg';
import lawnLuxuryImg from '../assets/images/lawn_luxury_campaign_1791437736955.jpg';
import royalVelvetImg from '../assets/images/royal_velvet_evening_1791437754980.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    sku: 'ZYR-LWN-001',
    title: 'Gul-e-Noor Embroidered Lawn 3-Piece Suit',
    category: 'Everyday Wear',
    subCategory: 'Lawn Suits',
    collection: 'Summer Luxury Lawn 2026',
    fabric: 'Swiss Voile Lawn & Pure Silk Dupatta',
    description: 'An ethereal pastel peach ensemble featuring intricate resham threadwork embroidery on the front neckline, side panels, and sleeve borders. Accompanied by a digital printed pure silk dupatta and dyed cambric trousers with organza lace borders.',
    originalPrice: 8500,
    salePrice: 6800,
    discountPercent: 20,
    rating: 4.9,
    reviewsCount: 38,
    colors: [
      { name: 'Pastel Peach', hex: '#FAD4C0' },
      { name: 'Mint Mist', hex: '#D8E2DC' },
      { name: 'Ivory White', hex: '#FAF9F6' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    sizeStock: { XS: 4, S: 12, M: 18, L: 8, XL: 3 },
    stock: 45,
    images: [
      lawnLuxuryImg,
      heroMallImg,
      festiveChiffonImg
    ],
    isNewArrival: true,
    isBestSeller: true,
    isFeatured: true,
    isSale: true,
    specifications: {
      shirtFabric: 'Embroidered Swiss Voile Lawn (3.0 Meters)',
      dupattaFabric: 'Digital Printed Medium Silk Dupatta (2.5 Meters)',
      trouserFabric: 'Dyed Cambric Cotton Trousers (2.5 Meters)',
      embroideryType: 'Resham Threadwork, Tilla Accents, Cutwork Borders',
      stitchType: 'Stitched',
      pieces: '3-Piece',
      careInstructions: 'Dry clean recommended. Iron on medium heat.'
    }
  },
  {
    id: 'prod-2',
    sku: 'ZYR-EID-002',
    title: 'Emerald Zari Chiffon Festive 3-Piece',
    category: 'Festive Wear',
    subCategory: 'Eid Collection',
    collection: 'Eid-ul-Fitr Royal Festive',
    fabric: 'Pure Crinkle Chiffon with Zari & Sequins',
    description: 'A regal emerald green festive outfit adorned with master artisan zari handwork, gold sequin sprinkles, and detailed hand-cut organza motifs on the daman. Features a luminous crinkle chiffon dupatta draped with scalloped borders.',
    originalPrice: 16500,
    salePrice: 13999,
    discountPercent: 15,
    rating: 5.0,
    reviewsCount: 52,
    colors: [
      { name: 'Emerald Green', hex: '#004B23' },
      { name: 'Royal Ruby', hex: '#800F2F' },
      { name: 'Deep Teal', hex: '#0B525B' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    sizeStock: { S: 8, M: 14, L: 10, XL: 6, XXL: 2 },
    stock: 40,
    images: [
      festiveChiffonImg,
      lawnLuxuryImg,
      royalVelvetImg
    ],
    isNewArrival: true,
    isBestSeller: true,
    isFeatured: true,
    isSale: true,
    specifications: {
      shirtFabric: 'Heavy Embroidered Pure Chiffon Shirt with Slip',
      dupattaFabric: 'Pure Crinkle Chiffon with 4-Sided Scallop Border',
      trouserFabric: 'Dyed Raw Silk Trouser with Zari Patch',
      embroideryType: 'Zari, Sequins, Dabka Handwork and Pearls',
      stitchType: 'Ready to Wear',
      pieces: '3-Piece',
      careInstructions: 'Strictly dry clean only to protect intricate gold zari.'
    }
  },
  {
    id: 'prod-3',
    sku: 'ZYR-VLV-003',
    title: 'Shahzadi Ruby Velvet Shawl & Suit',
    category: 'Formal Wear',
    subCategory: 'Velvet Dresses',
    collection: 'Royal Winter & Wedding Festive',
    fabric: 'Micro 9000 Pure Velvet with Hand-Embroidered Shawl',
    description: 'Created for grand winter soirees and weddings. Micro 9000 pure velvet kurta embellished with traditional dabka, nakshi, and kora work. Comes paired with a 2.75-meter heavily bordered velvet shawl in antique tilla and raw silk cigarette pants.',
    originalPrice: 24500,
    salePrice: 19500,
    discountPercent: 20,
    rating: 4.9,
    reviewsCount: 44,
    colors: [
      { name: 'Maroon Ruby', hex: '#58111A' },
      { name: 'Midnight Black', hex: '#1C1917' },
      { name: 'Royal Navy', hex: '#1B263B' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    sizeStock: { XS: 3, S: 7, M: 11, L: 5, XL: 2 },
    stock: 28,
    images: [
      royalVelvetImg,
      festiveChiffonImg,
      heroMallImg
    ],
    isNewArrival: false,
    isBestSeller: true,
    isFeatured: true,
    isSale: true,
    specifications: {
      shirtFabric: 'Pure Micro 9000 Velvet (Front & Back Embroidered)',
      dupattaFabric: 'Heavy Velvet Shawl with 4-Side Hand-Crafted Pallu',
      trouserFabric: 'Dyed Pakistani Raw Silk Trouser',
      embroideryType: 'Tilla, Dabka, Zardozi and Pearl Work',
      stitchType: 'Stitched',
      pieces: '3-Piece',
      careInstructions: 'Professional dry clean only. Store wrapped in muslin cloth.'
    }
  },
  {
    id: 'prod-4',
    sku: 'ZYR-PRT-004',
    title: 'Chandni Champagne Organza Pret Kurta',
    category: 'Premium Collection',
    subCategory: 'Luxury Pret',
    collection: 'Atelier Signature Pret 2026',
    fabric: 'Crystal Organza with Silk Lining',
    description: 'A modern silhouette for the discerning Pakistani woman. Champagne toned sheer crystal organza kurta with delicate white thread chikankari and hand-sewn pearl droplets along the sleeves and hemline. Finished with an attached pure crepe slip.',
    originalPrice: 9900,
    salePrice: 7999,
    discountPercent: 19,
    rating: 4.8,
    reviewsCount: 29,
    colors: [
      { name: 'Champagne Gold', hex: '#E6D5B8' },
      { name: 'Blush Rose', hex: '#E8C5C8' },
      { name: 'Powder Blue', hex: '#CFE0EB' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    sizeStock: { XS: 5, S: 10, M: 8, L: 4 },
    stock: 27,
    images: [
      heroMallImg,
      lawnLuxuryImg,
      festiveChiffonImg
    ],
    isNewArrival: true,
    isBestSeller: false,
    isFeatured: true,
    isSale: true,
    specifications: {
      shirtFabric: 'Hand-Embellished Crystal Organza with Crepe Slip',
      dupattaFabric: 'Organza Dupatta with Pearl Lace Edging',
      trouserFabric: 'Dyed Korean Silk Cigarette Pants',
      embroideryType: 'Chikankari, Cutwork, Pearl Droplets',
      stitchType: 'Ready to Wear',
      pieces: '2-Piece',
      careInstructions: 'Gentle dry cleaning only.'
    }
  },
  {
    id: 'prod-5',
    sku: 'ZYR-CTN-005',
    title: 'Noor-e-Subah Printed Cotton 2-Piece',
    category: 'Everyday Wear',
    subCategory: '2-Piece Suits',
    collection: 'Daily Casual Pret',
    fabric: 'Premium 100% Breathable Combed Cotton',
    description: 'Designed for daily comfort without compromising on traditional elegance. A fresh block-printed cotton tunic paired with a matching printed shalwar, detailed with fine wooden buttons and lace insertion on the collar.',
    originalPrice: 4800,
    salePrice: 3850,
    discountPercent: 20,
    rating: 4.7,
    reviewsCount: 31,
    colors: [
      { name: 'Teal Meadow', hex: '#2A9D8F' },
      { name: 'Mustard Ochre', hex: '#E76F51' },
      { name: 'Lilac Mist', hex: '#CDB4DB' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    sizeStock: { XS: 6, S: 15, M: 22, L: 14, XL: 8, XXL: 4 },
    stock: 69,
    images: [
      lawnLuxuryImg,
      heroMallImg
    ],
    isNewArrival: true,
    isBestSeller: false,
    isFeatured: false,
    isSale: true,
    specifications: {
      shirtFabric: '100% Cotton Printed Kurti (2.25 Meters)',
      dupattaFabric: 'Not included (2-Piece Suit)',
      trouserFabric: 'Matching Printed Cotton Trouser/Shalwar',
      embroideryType: 'Minimal neckline lace finish & wooden button placket',
      stitchType: 'Ready to Wear',
      pieces: '2-Piece',
      careInstructions: 'Machine washable on cold cycle. Line dry in shade.'
    }
  },
  {
    id: 'prod-6',
    sku: 'ZYR-SLK-006',
    title: 'Mehrunisa Pure Raw Silk Anarkali Gown',
    category: 'Party Wear',
    subCategory: 'Party Dresses',
    collection: 'Wedding Guest Luxury',
    fabric: '80g Pure Pakistani Raw Silk & Organza Dupatta',
    description: 'A 16-kali flared floor-length Anarkali gown in rich plum raw silk, detailed with gota patti borders, mirror work on bodice, and a heavy organza dupatta woven with banarsi gold borders.',
    originalPrice: 21000,
    salePrice: 17850,
    discountPercent: 15,
    rating: 4.9,
    reviewsCount: 22,
    colors: [
      { name: 'Plum Wine', hex: '#4A154B' },
      { name: 'Deep Rust', hex: '#9E2A2B' },
      { name: 'Bottle Green', hex: '#1B4332' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    sizeStock: { S: 5, M: 9, L: 6, XL: 2 },
    stock: 22,
    images: [
      festiveChiffonImg,
      royalVelvetImg
    ],
    isNewArrival: false,
    isBestSeller: true,
    isFeatured: true,
    isSale: false,
    specifications: {
      shirtFabric: 'Pure 80g Raw Silk 16-Kali Flared Anarkali with Can-can',
      dupattaFabric: 'Banarsi Jacquard Organza Dupatta (2.75 Meters)',
      trouserFabric: 'Churidar Raw Silk Trouser',
      embroideryType: 'Handcrafted Gota Patti, Real Mirror Work, Zari Bodice',
      stitchType: 'Ready to Wear',
      pieces: '3-Piece',
      careInstructions: 'Dry clean only.'
    }
  },
  {
    id: 'prod-7',
    sku: 'ZYR-BRD-007',
    title: 'Dilkash Bridal Inspired Chiffon Peshwas',
    category: 'Premium Collection',
    subCategory: 'Bridal Wear',
    collection: 'Heirloom Bridal Couture',
    fabric: 'Pure Silk Chiffon with Zardozi and Dabka Work',
    description: 'An ode to traditional Pakistani craftsmanship. Handcrafted peshwas featuring heavy marori, kora, dabka and real pearl embellishments on pure silk chiffon. Features a 4-sided matha patti bridal dupatta and a pure jamawar lehenga.',
    originalPrice: 42000,
    salePrice: 34999,
    discountPercent: 17,
    rating: 5.0,
    reviewsCount: 17,
    colors: [
      { name: 'Rosewater Pink', hex: '#E7C6C7' },
      { name: 'Antique Gold', hex: '#D4AF37' },
      { name: 'Ivory Bridal', hex: '#FDFBF7' }
    ],
    sizes: ['S', 'M', 'L'],
    sizeStock: { S: 3, M: 5, L: 2 },
    stock: 10,
    images: [
      heroMallImg,
      festiveChiffonImg,
      royalVelvetImg
    ],
    isNewArrival: false,
    isBestSeller: true,
    isFeatured: true,
    isSale: true,
    specifications: {
      shirtFabric: 'Silk Chiffon Peshwas with Raw Silk Bodice & Lining',
      dupattaFabric: 'Net Chiffon Bridal Dupatta with Heavy Borders',
      trouserFabric: 'Pure Banarsi Jamawar Flared Lehenga',
      embroideryType: 'Zardozi, Marori, Hand Cut Sequins, Swarovski Crystals',
      stitchType: 'Custom Stitched',
      pieces: '3-Piece',
      careInstructions: 'High-end specialty dry clean only.'
    }
  },
  {
    id: 'prod-8',
    sku: 'ZYR-CHK-008',
    title: 'Sheesh Mahal White Chikankari Kurta',
    category: 'Everyday Wear',
    subCategory: 'Casual Shalwar Kameez',
    collection: 'Pure Whites Collection',
    fabric: 'Fine Cotton Mulmul with Tone-on-Tone Chikankari',
    description: 'A timeless staple of Pakistani grace. Pristine off-white cotton mulmul kurta decorated with intricate Lakhnavi chikankari shadow work, delicate crochet laces on the sleeves, and a matching cotton dupatta with scalloped borders.',
    originalPrice: 6500,
    salePrice: 5200,
    discountPercent: 20,
    rating: 4.8,
    reviewsCount: 47,
    colors: [
      { name: 'Pearl White', hex: '#FBFBFB' },
      { name: 'Ivory Cream', hex: '#FAF0E6' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    sizeStock: { XS: 7, S: 14, M: 20, L: 12, XL: 5, XXL: 2 },
    stock: 60,
    images: [
      lawnLuxuryImg,
      heroMallImg
    ],
    isNewArrival: true,
    isBestSeller: true,
    isFeatured: false,
    isSale: true,
    specifications: {
      shirtFabric: 'Tone-on-Tone Embroidered Cotton Mulmul Kurta',
      dupattaFabric: 'Scalloped Cotton Mulmul Dupatta',
      trouserFabric: 'Matching Culotte Trousers with Lace Hem',
      embroideryType: 'Intricate Shadow Chikankari & Ghaas Patti',
      stitchType: 'Ready to Wear',
      pieces: '3-Piece',
      careInstructions: 'Hand wash in cold water or gentle machine wash.'
    }
  },
  {
    id: 'prod-9',
    sku: 'ZYR-SAL-009',
    title: 'Falaknuma Jacquard Festive 3-Piece',
    category: 'Sale',
    subCategory: 'Festive Dresses',
    collection: 'Mega Season Clearance',
    fabric: 'Self Weave Cotton Jacquard with Organza',
    description: 'Specially discounted for our seasonal clearance. Gold zari woven cotton jacquard front with embroidered daman patch, paired with digital printed organza dupatta and dyed cambric cigarette pants.',
    originalPrice: 8900,
    salePrice: 5340,
    discountPercent: 40,
    rating: 4.7,
    reviewsCount: 39,
    colors: [
      { name: 'Opal Mint', hex: '#D0E1D4' },
      { name: 'Blush Mauve', hex: '#D8B4E2' },
      { name: 'Sunset Peach', hex: '#F7C59F' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    sizeStock: { S: 6, M: 11, L: 7, XL: 2 },
    stock: 26,
    images: [
      lawnLuxuryImg,
      festiveChiffonImg
    ],
    isNewArrival: false,
    isBestSeller: false,
    isFeatured: false,
    isSale: true,
    specifications: {
      shirtFabric: 'Gold Woven Self Cotton Jacquard (3.0M)',
      dupattaFabric: 'Digital Printed Pure Organza Dupatta',
      trouserFabric: 'Dyed Cambric Trouser with Embroidered Motif',
      embroideryType: 'Tilla jacquard weave with resham applique patch',
      stitchType: 'Stitched',
      pieces: '3-Piece',
      careInstructions: 'Dry clean recommended.'
    }
  },
  {
    id: 'prod-10',
    sku: 'ZYR-RAM-010',
    title: 'Mah-e-Noor Pastel Lavender Ramadan Pret',
    category: 'Festive Wear',
    subCategory: 'Ramadan Collection',
    collection: 'Iftar & Ramadan Soirees',
    fabric: 'Fine Cotton Net with Silk Slip',
    description: 'Serene and graceful. Soft lavender cotton net shirt adorned with delicate silver sitara and threadwork floral vines. Features an airy dupatta with lace edging and straight cut silk culottes.',
    originalPrice: 11500,
    salePrice: 9200,
    discountPercent: 20,
    rating: 4.9,
    reviewsCount: 26,
    colors: [
      { name: 'Lavender Mist', hex: '#E6E6FA' },
      { name: 'Sky Celeste', hex: '#E0F2FE' },
      { name: 'Soft Sage', hex: '#DCFCE7' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    sizeStock: { XS: 4, S: 8, M: 10, L: 5, XL: 3 },
    stock: 30,
    images: [
      heroMallImg,
      festiveChiffonImg
    ],
    isNewArrival: true,
    isBestSeller: false,
    isFeatured: true,
    isSale: true,
    specifications: {
      shirtFabric: 'Embroidered Cotton Net Shirt with Inner Silk Slip',
      dupattaFabric: 'Cotton Net Dupatta with Hand-finished Kiran Lace',
      trouserFabric: 'Dyed Silk Cigarette Trousers',
      embroideryType: 'Silver Sitara, Pukhta Threadwork and Lace Finishes',
      stitchType: 'Ready to Wear',
      pieces: '3-Piece',
      careInstructions: 'Dry clean only.'
    }
  },
  {
    id: 'prod-11',
    sku: 'ZYR-PRT-011',
    title: 'Aftab Gold Tissue Silk Formal Angrakha',
    category: 'Party Wear',
    subCategory: 'Designer Inspired Dresses',
    collection: 'Royal Heritage Pret',
    fabric: 'Shimmering Metallic Tissue Silk & Organza',
    description: 'A traditional overlapping Angrakha silhouette in shimmering gold tissue silk. Detailed with handcrafted latkans (tassels), pearl buttons, and gold marori work. Complete with a contrast magenta organza dupatta.',
    originalPrice: 18500,
    salePrice: 15725,
    discountPercent: 15,
    rating: 4.9,
    reviewsCount: 19,
    colors: [
      { name: 'Shimmer Gold', hex: '#E5C158' },
      { name: 'Rose Gold', hex: '#C5A088' }
    ],
    sizes: ['S', 'M', 'L'],
    sizeStock: { S: 4, M: 7, L: 4 },
    stock: 15,
    images: [
      royalVelvetImg,
      festiveChiffonImg
    ],
    isNewArrival: true,
    isBestSeller: false,
    isFeatured: true,
    isSale: false,
    specifications: {
      shirtFabric: 'Metallic Woven Tissue Silk Angrakha with Cotton Silk Lining',
      dupattaFabric: 'Contrast Organza Dupatta with Gota Trims',
      trouserFabric: 'Raw Silk Straight Pants',
      embroideryType: 'Marori work, Handcrafted Tassels, Zari piping',
      stitchType: 'Ready to Wear',
      pieces: '3-Piece',
      careInstructions: 'Specialty dry cleaning recommended.'
    }
  },
  {
    id: 'prod-12',
    sku: 'ZYR-LWN-012',
    title: 'Bahaar Digital Printed Lawn 2-Piece',
    category: 'Everyday Wear',
    subCategory: 'Printed Suits',
    collection: 'Summer Breeze Essentials',
    fabric: 'Superfine 80s Cotton Lawn',
    description: 'Vibrant botanical motifs inspired by traditional Kashmiri gardens. Comprises a digitally printed lawn shirt with embroidered sleeve borders and matching printed lawn trousers.',
    originalPrice: 4200,
    salePrice: 3360,
    discountPercent: 20,
    rating: 4.8,
    reviewsCount: 35,
    colors: [
      { name: 'Coral Coral', hex: '#FF7F50' },
      { name: 'Turquoise Lake', hex: '#40E0D0' },
      { name: 'Olive Green', hex: '#808000' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    sizeStock: { XS: 5, S: 12, M: 16, L: 8, XL: 4 },
    stock: 45,
    images: [
      lawnLuxuryImg,
      heroMallImg
    ],
    isNewArrival: false,
    isBestSeller: false,
    isFeatured: false,
    isSale: true,
    specifications: {
      shirtFabric: '80s Combed Lawn Shirt (2.25 Meters)',
      dupattaFabric: 'None (2-Piece)',
      trouserFabric: 'Matching Printed Lawn Pants (2.0 Meters)',
      embroideryType: 'Embroidered organza border for sleeves & daman',
      stitchType: 'Ready to Wear',
      pieces: '2-Piece',
      careInstructions: 'Machine wash with like colors on cold.'
    }
  }
];

export const INITIAL_REVIEWS: ProductReview[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    authorName: 'Ayesha Siddiqui',
    city: 'Lahore (Gulberg)',
    rating: 5,
    comment: 'SubhanAllah, the fabric is even softer in person than in the photos! The resham embroidery is so clean and pure silk dupatta gives it a truly luxury boutique look. Delivery took only 2 days in Lahore. Will order again for Eid!',
    verifiedPurchase: true,
    createdAt: '2026-09-28',
    approved: true
  },
  {
    id: 'rev-2',
    productId: 'prod-1',
    authorName: 'Dr. Fatima Tariq',
    city: 'Islamabad (F-7)',
    rating: 5,
    comment: 'The stitching fit is spot on for Size Medium! Very pleased with the quality of organza laces on trousers. Cash on delivery was seamless.',
    verifiedPurchase: true,
    createdAt: '2026-10-01',
    approved: true
  },
  {
    id: 'rev-3',
    productId: 'prod-2',
    authorName: 'Zainab Qureshi',
    city: 'Karachi (DHA)',
    rating: 5,
    comment: 'Wore this emerald chiffon suit to my cousin’s dholki in Karachi and received countless compliments! The zari handwork shines so gracefully under evening lights.',
    verifiedPurchase: true,
    createdAt: '2026-10-03',
    approved: true
  },
  {
    id: 'rev-4',
    productId: 'prod-3',
    authorName: 'Mahnood Bilal',
    city: 'Faisalabad',
    rating: 5,
    comment: 'The Micro 9000 velvet is genuine heavyweight velvet, not synthetic feeling! The shawl alone is worth every single rupee. Premium packaging with cedar dustbag was such a nice touch.',
    verifiedPurchase: true,
    createdAt: '2026-09-15',
    approved: true
  },
  {
    id: 'rev-5',
    productId: 'prod-4',
    authorName: 'Sana Rizvi',
    city: 'Rawalpindi',
    rating: 4,
    comment: 'Extremely chic organza pret kurta. Loved the champagne color and pearl droplets. Sizing is true to standard Pakistani pret sizes.',
    verifiedPurchase: true,
    createdAt: '2026-10-04',
    approved: true
  }
];
