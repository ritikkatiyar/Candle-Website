import connectToDatabase from '../lib/mongodb.js';
import Content from '../models/ContentModel.js';

const seedContent = [
  // About section
  {
    section: 'about',
    title: '✨ About Anaya Candles – Where Light Meets Art! 🕯️',
    content: 'At Anaya Candles, we believe a candle is more than just wax and wick—it\'s an experience, a memory, and a moment of peace.',
    order: 1
  },
  // Story section
  {
    section: 'story',
    title: '💛 Our Story',
    content: 'Anaya Candles was born out of a passion to blend creativity with sustainability. What started as a hobby is now a growing brand pouring love into every candle. From cozy nights to festive celebrations, we light up your world.',
    image: '/story.jpeg',
    order: 1
  },
  // Features section
  {
    section: 'features',
    title: '🌿 Handcrafted with Passion & Purpose',
    content: '✨ Eco-Friendly Wax – Made with sustainable, toxin-free ingredients.',
    order: 1
  },
  {
    section: 'features',
    title: '🌿 Handcrafted with Passion & Purpose',
    content: '🌸 Aromas That Speak – Scents that transport you to beautiful memories.',
    order: 2
  },
  {
    section: 'features',
    title: '🌿 Handcrafted with Passion & Purpose',
    content: '🕯️ Unique Designs – From floral embeds to coconut shell creations.',
    order: 3
  },
  // Collections section title
  {
    section: 'collections',
    title: '🔥 Explore Our Collections',
    content: 'Discover our amazing collection of handcrafted candles',
    order: 1
  },
  // Care tips section
  {
    section: 'care-tips',
    title: '💡 Candle Care Tips',
    content: '✅ Trim the wick to ¼ inch before lighting.',
    order: 1
  },
  {
    section: 'care-tips',
    title: '💡 Candle Care Tips',
    content: '✅ Let the wax melt evenly for a clean burn.',
    order: 2
  },
  {
    section: 'care-tips',
    title: '💡 Candle Care Tips',
    content: '✅ Avoid placing candles near air vents or drafts.',
    order: 3
  },
  {
    section: 'care-tips',
    title: '💡 Candle Care Tips',
    content: '✅ Reuse your candle jars creatively!',
    order: 4
  },
  // Reviews section
  {
    section: 'reviews',
    title: '❤️ Customer Love',
    content: '"The fragrance, the design, the packaging—everything is just perfect. You can tell these candles are made with so much care and love!" — Rohan K.',
    order: 1
  },
  {
    section: 'reviews',
    title: '❤️ Customer Love',
    content: '"I absolutely LOVE Anaya Candles! The coconut shell candle not only smells amazing but also looks stunning in my home décor." — Priya S.',
    order: 2
  },
  // Contact section
  {
    section: 'contact',
    title: '✨ Let\'s Create Something Beautiful Together!',
    content: '✨ Let\'s Create Something Beautiful Together!',
    order: 1
  }
];

async function seedDatabase() {
  try {
    await connectToDatabase();
    console.log('Connected to database');

    // Clear existing content
    await Content.deleteMany({});
    console.log('Cleared existing content');

    // Insert new content
    await Content.insertMany(seedContent);
    console.log('Seeded content successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding content:', error);
    process.exit(1);
  }
}

seedDatabase();