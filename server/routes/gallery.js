import { Router } from 'express';
import Gallery from '../models/Gallery.js';

const router = Router();

const fallbackGallery = [
  {
    _id: '1',
    title: 'Modern Workspace',
    description: 'Our collaborative open-plan office designed for innovation.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    category: 'office',
  },
  {
    _id: '2',
    title: 'Team Collaboration',
    description: 'Cross-functional teams working on cutting-edge solutions.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    category: 'team',
  },
  {
    _id: '3',
    title: 'Tech Innovation',
    description: 'Building the future with modern technology stacks.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    category: 'tech',
  },
  {
    _id: '4',
    title: 'Client Success',
    description: 'Delivering exceptional results for our partners.',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    category: 'events',
  },
  {
    _id: '5',
    title: 'Product Launch',
    description: 'Celebrating milestones and product releases.',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    category: 'events',
  },
  {
    _id: '6',
    title: 'Global Reach',
    description: 'Connecting with clients across the world.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    category: 'office',
  },
];

router.get('/', async (_req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.json(items.length ? items : fallbackGallery);
  } catch {
    res.json(fallbackGallery);
  }
});

router.post('/', async (req, res) => {
  try {
    const item = await Gallery.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
