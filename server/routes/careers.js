import { Router } from 'express';
import Career from '../models/Career.js';

const router = Router();

const fallbackCareers = [
  {
    _id: '1',
    title: 'Senior Full Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Lead development of our MERN stack applications and mentor junior developers.',
    requirements: ['5+ years experience', 'React & Node.js', 'MongoDB', 'Team leadership'],
    isActive: true,
  },
  {
    _id: '2',
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Hybrid',
    type: 'Full-time',
    description: 'Create stunning user experiences and design systems for web and mobile products.',
    requirements: ['3+ years experience', 'Figma', 'Design systems', 'Prototyping'],
    isActive: true,
  },
  {
    _id: '3',
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    location: 'Remote',
    type: 'Full-time',
    description: 'Build and maintain CI/CD pipelines, cloud infrastructure, and monitoring systems.',
    requirements: ['AWS/GCP', 'Docker & Kubernetes', 'CI/CD', 'Linux'],
    isActive: true,
  },
  {
    _id: '4',
    title: 'Product Manager',
    department: 'Product',
    location: 'On-site',
    type: 'Full-time',
    description: 'Drive product strategy, roadmap planning, and cross-team collaboration.',
    requirements: ['4+ years PM experience', 'Agile/Scrum', 'Analytics', 'Stakeholder management'],
    isActive: true,
  },
];

router.get('/', async (_req, res) => {
  try {
    const careers = await Career.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(careers.length ? careers : fallbackCareers);
  } catch {
    res.json(fallbackCareers);
  }
});

router.post('/', async (req, res) => {
  try {
    const career = await Career.create(req.body);
    res.status(201).json(career);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
