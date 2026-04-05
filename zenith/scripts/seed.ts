import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/zenith'

const productSchema = new mongoose.Schema({
    name: String,
    slug: String,
    brand: { type: String, default: 'ZENITH' },
    category: String,
    type: String,
    price: Number,
    compareAtPrice: Number,
    description: String,
    longDescription: String,
    images: [{ url: String, alt: String }],
    colors: [{
        name: String,
        hex: String,
        images: [String],
    }],
    sizes: [{
        size: Number,
        stock: Number,
    }],
    rating: {
        average: { type: Number, default: 4.5 },
        count: { type: Number, default: 0 },
    },
    isFeatured: { type: Boolean, default: false },
    isNew: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
}, { timestamps: true })

const Product = mongoose.models.Product || mongoose.model('Product', productSchema)

function unsplash(id: string) {
    return `https://images.unsplash.com/${id}?w=800&h=800&fit=crop&q=80`
}

const menProducts = [
    {
        name: 'Apex Runner Pro',
        slug: 'apex-runner-pro',
        category: 'men',
        type: 'Running',
        price: 249,
        compareAtPrice: 299,
        description: 'The pinnacle of running technology. Engineered with ZENITH ProFoam for unmatched responsiveness and energy return.',
        longDescription: 'The Apex Runner Pro represents 3 years of R&D. Its triple-density midsole provides the perfect balance of cushion and response, while the 3D-knit upper adapts to your foot shape. Whether training for a marathon or crushing interval sessions, this is the shoe that elevates every stride.',
        images: [{ url: unsplash('photo-1542291026-7eec264c27ff'), alt: 'Apex Runner Pro' }],
        colors: [
            { name: 'Electric Violet', hex: '#7C3AED', images: [unsplash('photo-1542291026-7eec264c27ff'), unsplash('photo-1606107557195-0e29a4b5b4aa')] },
            { name: 'Stealth Black', hex: '#1a1a1a', images: [unsplash('photo-1551107696-a4b0c5a0d9a2'), unsplash('photo-1491553895911-0055eca6402d')] },
        ],
        sizes: [
            { size: 7, stock: 15 }, { size: 8, stock: 20 }, { size: 9, stock: 25 },
            { size: 10, stock: 30 }, { size: 11, stock: 20 }, { size: 12, stock: 10 }, { size: 13, stock: 5 },
        ],
        rating: { average: 4.9, count: 342 },
        isFeatured: true,
        isNew: true,
    },
    {
        name: 'Shadow Lite',
        slug: 'shadow-lite',
        category: 'men',
        type: 'Lifestyle',
        price: 189,
        description: 'Minimal design. Maximum impact. The Shadow Lite redefines what a lifestyle sneaker can be.',
        longDescription: 'The Shadow Lite is for those who move through life with effortless style. Its featherweight construction and buttery-soft leather upper make it the perfect all-day shoe, while the signature shadow-stitch detailing adds a subtle edge.',
        images: [{ url: unsplash('photo-1600269452121-4f2416e55c28'), alt: 'Shadow Lite' }],
        colors: [
            { name: 'Cloud White', hex: '#F5F5F7', images: [unsplash('photo-1600269452121-4f2416e55c28'), unsplash('photo-1595950653106-6c9ebd614d3a')] },
            { name: 'Midnight Navy', hex: '#1e3a5f', images: [unsplash('photo-1605348532760-6753d2c43329'), unsplash('photo-1584735175315-9d5df23860e6')] },
        ],
        sizes: [
            { size: 7, stock: 10 }, { size: 8, stock: 15 }, { size: 9, stock: 20 },
            { size: 10, stock: 25 }, { size: 11, stock: 15 }, { size: 12, stock: 8 }, { size: 13, stock: 3 },
        ],
        rating: { average: 4.7, count: 218 },
        isFeatured: true,
        isNew: false,
    },
    {
        name: 'Velocity X',
        slug: 'velocity-x',
        category: 'men',
        type: 'Training',
        price: 219,
        compareAtPrice: 259,
        description: 'Built for explosive performance. From box jumps to burpees, Velocity X keeps up with your intensity.',
        longDescription: 'The Velocity X is a training shoe re-imagined. A reinforced heel counter provides lateral stability during agility drills, while the breathable upper keeps your feet cool through high-intensity intervals. The grip pattern on the outsole delivers traction on any gym surface.',
        images: [{ url: unsplash('photo-1606107557195-0e29a4b5b4aa'), alt: 'Velocity X' }],
        colors: [
            { name: 'Crimson Fire', hex: '#DC2626', images: [unsplash('photo-1606107557195-0e29a4b5b4aa'), unsplash('photo-1542291026-7eec264c27ff')] },
            { name: 'Gunmetal', hex: '#374151', images: [unsplash('photo-1551107696-a4b0c5a0d9a2'), unsplash('photo-1605348532760-6753d2c43329')] },
        ],
        sizes: [
            { size: 7, stock: 12 }, { size: 8, stock: 18 }, { size: 9, stock: 22 },
            { size: 10, stock: 28 }, { size: 11, stock: 16 }, { size: 12, stock: 9 }, { size: 13, stock: 4 },
        ],
        rating: { average: 4.6, count: 156 },
        isFeatured: true,
        isNew: false,
    },
    {
        name: 'Ghost Drift',
        slug: 'ghost-drift',
        category: 'men',
        type: 'Lifestyle',
        price: 199,
        description: 'Walk on air. The Ghost Drift combines ethereal design with cloud-like comfort.',
        longDescription: 'Inspired by minimalist architecture, the Ghost Drift features a translucent mesh upper that reveals the inner engineering. The full-length air cushion provides all-day floating comfort, while the geometric outsole pattern is inspired by Milan cathedral floor tiles.',
        images: [{ url: unsplash('photo-1491553895911-0055eca6402d'), alt: 'Ghost Drift' }],
        colors: [
            { name: 'Phantom Grey', hex: '#6B7280', images: [unsplash('photo-1491553895911-0055eca6402d'), unsplash('photo-1600269452121-4f2416e55c28')] },
            { name: 'Aurora Green', hex: '#059669', images: [unsplash('photo-1605348532760-6753d2c43329'), unsplash('photo-1584735175315-9d5df23860e6')] },
        ],
        sizes: [
            { size: 7, stock: 8 }, { size: 8, stock: 14 }, { size: 9, stock: 19 },
            { size: 10, stock: 24 }, { size: 11, stock: 13 }, { size: 12, stock: 7 }, { size: 13, stock: 2 },
        ],
        rating: { average: 4.8, count: 287 },
        isFeatured: false,
        isNew: true,
    },
    {
        name: 'Titan Force',
        slug: 'titan-force',
        category: 'men',
        type: 'Running',
        price: 279,
        description: 'Built for long distances. The Titan Force is our most cushioned running shoe ever.',
        longDescription: 'Ultra marathon runners demanded more, and we delivered. The Titan Force features our thickest ZENITH ProFoam stack height for maximum energy return over long distances, combined with a carbon fiber plate for propulsive toe-off.',
        images: [{ url: unsplash('photo-1551107696-a4b0c5a0d9a2'), alt: 'Titan Force' }],
        colors: [
            { name: 'Solar Orange', hex: '#EA580C', images: [unsplash('photo-1551107696-a4b0c5a0d9a2'), unsplash('photo-1542291026-7eec264c27ff')] },
            { name: 'Deep Ocean', hex: '#1e40af', images: [unsplash('photo-1606107557195-0e29a4b5b4aa'), unsplash('photo-1605348532760-6753d2c43329')] },
        ],
        sizes: [
            { size: 7, stock: 6 }, { size: 8, stock: 12 }, { size: 9, stock: 18 },
            { size: 10, stock: 22 }, { size: 11, stock: 14 }, { size: 12, stock: 6 }, { size: 13, stock: 3 },
        ],
        rating: { average: 4.8, count: 198 },
        isFeatured: true,
        isNew: false,
    },
    {
        name: 'Urban Legend',
        slug: 'urban-legend',
        category: 'men',
        type: 'Sneakers',
        price: 169,
        description: 'Street-ready. The Urban Legend is the perfect fusion of skate culture and luxury craft.',
        longDescription: 'The Urban Legend takes cues from street culture and refines them through ZENITH lens. Premium suede panels, vulcanized rubber sole for board feel, and a padded collar for ankle support. From skate parks to rooftop bars, this shoe does it all.',
        images: [{ url: unsplash('photo-1584735175315-9d5df23860e6'), alt: 'Urban Legend' }],
        colors: [
            { name: 'Sand Dune', hex: '#D4A574', images: [unsplash('photo-1584735175315-9d5df23860e6'), unsplash('photo-1600269452121-4f2416e55c28')] },
            { name: 'Obsidian', hex: '#1a1a1a', images: [unsplash('photo-1605348532760-6753d2c43329'), unsplash('photo-1551107696-a4b0c5a0d9a2')] },
        ],
        sizes: [
            { size: 7, stock: 10 }, { size: 8, stock: 16 }, { size: 9, stock: 21 },
            { size: 10, stock: 26 }, { size: 11, stock: 17 }, { size: 12, stock: 8 }, { size: 13, stock: 4 },
        ],
        rating: { average: 4.5, count: 132 },
        isFeatured: false,
        isNew: false,
    },
]

const womenProducts = [
    {
        name: 'Nova Pulse',
        slug: 'nova-pulse',
        category: 'women',
        type: 'Running',
        price: 239,
        compareAtPrice: 289,
        description: 'Lightweight power for every pace. The Nova Pulse is designed for women who run like the wind.',
        longDescription: 'The Nova Pulse was designed in collaboration with elite female runners. The narrower heel geometry locks your foot in place, while the adaptive mesh upper expands naturally at the forefoot. ZENITH ProFoam responds to every pace, from easy jogs to race-day sprints.',
        images: [{ url: unsplash('photo-1595950653106-6c9ebd614d3a'), alt: 'Nova Pulse' }],
        colors: [
            { name: 'Rose Gold', hex: '#F472B6', images: [unsplash('photo-1595950653106-6c9ebd614d3a'), unsplash('photo-1542291026-7eec264c27ff')] },
            { name: 'Arctic White', hex: '#F9FAFB', images: [unsplash('photo-1600269452121-4f2416e55c28'), unsplash('photo-1606107557195-0e29a4b5b4aa')] },
        ],
        sizes: [
            { size: 5, stock: 10 }, { size: 6, stock: 18 }, { size: 7, stock: 24 },
            { size: 8, stock: 28 }, { size: 9, stock: 20 }, { size: 10, stock: 12 }, { size: 11, stock: 5 },
        ],
        rating: { average: 4.9, count: 278 },
        isFeatured: true,
        isNew: true,
    },
    {
        name: 'Celestial Weave',
        slug: 'celestial-weave',
        category: 'women',
        type: 'Lifestyle',
        price: 199,
        description: 'Art meets comfort. The Celestial Weave is a statement piece that happens to be incredibly wearable.',
        longDescription: 'Inspired by celestial tapestries, the Celestial Weave features an iridescent woven upper that catches light from every angle. The sock-like fit hugs your foot, while the responsive cushion lets you walk for hours without fatigue.',
        images: [{ url: unsplash('photo-1605348532760-6753d2c43329'), alt: 'Celestial Weave' }],
        colors: [
            { name: 'Starlight Purple', hex: '#8B5CF6', images: [unsplash('photo-1605348532760-6753d2c43329'), unsplash('photo-1595950653106-6c9ebd614d3a')] },
            { name: 'Moonbeam Silver', hex: '#D1D5DB', images: [unsplash('photo-1600269452121-4f2416e55c28'), unsplash('photo-1584735175315-9d5df23860e6')] },
        ],
        sizes: [
            { size: 5, stock: 8 }, { size: 6, stock: 15 }, { size: 7, stock: 22 },
            { size: 8, stock: 25 }, { size: 9, stock: 18 }, { size: 10, stock: 10 }, { size: 11, stock: 4 },
        ],
        rating: { average: 4.8, count: 196 },
        isFeatured: true,
        isNew: false,
    },
    {
        name: 'Phoenix Rise',
        slug: 'phoenix-rise',
        category: 'women',
        type: 'Training',
        price: 209,
        description: 'Rise and conquer. From HIIT to yoga, the Phoenix Rise adapts to your every move.',
        longDescription: 'The Phoenix Rise is a versatile training shoe built for the modern athlete. Lateral reinforcements provide stability during quick cuts, while the flexible forefoot allows natural toe splay during bodyweight exercises. The grip pattern transitions seamlessly between indoor and outdoor surfaces.',
        images: [{ url: unsplash('photo-1584735175315-9d5df23860e6'), alt: 'Phoenix Rise' }],
        colors: [
            { name: 'Sunset Coral', hex: '#FB923C', images: [unsplash('photo-1584735175315-9d5df23860e6'), unsplash('photo-1605348532760-6753d2c43329')] },
            { name: 'Slate', hex: '#64748B', images: [unsplash('photo-1551107696-a4b0c5a0d9a2'), unsplash('photo-1600269452121-4f2416e55c28')] },
        ],
        sizes: [
            { size: 5, stock: 9 }, { size: 6, stock: 16 }, { size: 7, stock: 20 },
            { size: 8, stock: 24 }, { size: 9, stock: 16 }, { size: 10, stock: 9 }, { size: 11, stock: 3 },
        ],
        rating: { average: 4.7, count: 164 },
        isFeatured: true,
        isNew: false,
    },
    {
        name: 'Aura Glide',
        slug: 'aura-glide',
        category: 'women',
        type: 'Running',
        price: 259,
        description: 'Glide through every mile. The Aura Glide is our most cushioned women running shoe.',
        longDescription: 'Designed for women who love long, meditative runs. The Aura Glide features an extra-wide platform for stability, a plush collar that eliminates heel slip, and our most responsive foam stack for mile after effortless mile.',
        images: [{ url: unsplash('photo-1542291026-7eec264c27ff'), alt: 'Aura Glide' }],
        colors: [
            { name: 'Lavender Dream', hex: '#A78BFA', images: [unsplash('photo-1542291026-7eec264c27ff'), unsplash('photo-1595950653106-6c9ebd614d3a')] },
            { name: 'Mint Fresh', hex: '#34D399', images: [unsplash('photo-1606107557195-0e29a4b5b4aa'), unsplash('photo-1491553895911-0055eca6402d')] },
        ],
        sizes: [
            { size: 5, stock: 7 }, { size: 6, stock: 14 }, { size: 7, stock: 19 },
            { size: 8, stock: 23 }, { size: 9, stock: 15 }, { size: 10, stock: 8 }, { size: 11, stock: 3 },
        ],
        rating: { average: 4.9, count: 231 },
        isFeatured: true,
        isNew: true,
    },
    {
        name: 'Vibe Walker',
        slug: 'vibe-walker',
        category: 'women',
        type: 'Sneakers',
        price: 179,
        description: 'Everyday chic. The Vibe Walker is the sneaker that goes with everything.',
        longDescription: 'Premium leather meets modern minimalism. A clean silhouette with just enough detail — from the subtle ZENITH branding to the tonal stitching. The memory foam insole makes every step feel like walking on a cloud.',
        images: [{ url: unsplash('photo-1600269452121-4f2416e55c28'), alt: 'Vibe Walker' }],
        colors: [
            { name: 'Cream', hex: '#FEF3C7', images: [unsplash('photo-1600269452121-4f2416e55c28'), unsplash('photo-1605348532760-6753d2c43329')] },
            { name: 'Blush Pink', hex: '#FECDD3', images: [unsplash('photo-1595950653106-6c9ebd614d3a'), unsplash('photo-1584735175315-9d5df23860e6')] },
        ],
        sizes: [
            { size: 5, stock: 11 }, { size: 6, stock: 17 }, { size: 7, stock: 22 },
            { size: 8, stock: 26 }, { size: 9, stock: 18 }, { size: 10, stock: 10 }, { size: 11, stock: 4 },
        ],
        rating: { average: 4.6, count: 143 },
        isFeatured: false,
        isNew: false,
    },
    {
        name: 'Storm Tracker',
        slug: 'storm-tracker',
        category: 'women',
        type: 'Running',
        price: 229,
        description: 'Rain or shine, the Storm Tracker keeps you going with waterproof performance.',
        longDescription: 'The Storm Tracker features a Gore-Tex-inspired waterproof membrane that keeps water out while letting moisture escape. Reflective details ensure visibility in low light, and the aggressive outsole grips wet surfaces with confidence.',
        images: [{ url: unsplash('photo-1491553895911-0055eca6402d'), alt: 'Storm Tracker' }],
        colors: [
            { name: 'Storm Grey', hex: '#4B5563', images: [unsplash('photo-1491553895911-0055eca6402d'), unsplash('photo-1551107696-a4b0c5a0d9a2')] },
            { name: 'Electric Blue', hex: '#3B82F6', images: [unsplash('photo-1606107557195-0e29a4b5b4aa'), unsplash('photo-1542291026-7eec264c27ff')] },
        ],
        sizes: [
            { size: 5, stock: 6 }, { size: 6, stock: 12 }, { size: 7, stock: 18 },
            { size: 8, stock: 22 }, { size: 9, stock: 14 }, { size: 10, stock: 7 }, { size: 11, stock: 2 },
        ],
        rating: { average: 4.7, count: 112 },
        isFeatured: false,
        isNew: true,
    },
]

async function seed() {
    console.log('🚀 Seeding ZENITH database...')
    console.log('Connecting to MongoDB...')

    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    // Clear existing products
    await Product.deleteMany({})
    console.log('🗑️  Cleared existing products')

    // Insert products
    const allProducts = [...menProducts, ...womenProducts]
    await Product.insertMany(allProducts)
    console.log(`✅ Seeded ${allProducts.length} products (${menProducts.length} men, ${womenProducts.length} women)`)

    await mongoose.disconnect()
    console.log('✅ Database seeded successfully!')
    process.exit(0)
}

seed().catch((err) => {
    console.error('❌ Seed error:', err)
    process.exit(1)
})
