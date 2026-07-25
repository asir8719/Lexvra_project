import { Router } from 'express';
import Service from '../models/Service.js';

const router = Router();

const fallbackServices = [
  {
    _id: '1',
    title: 'Web Development',
    description: 'Custom MERN stack applications built for scale, performance, and modern user experiences.',
    icon: 'code',
    features: ['React & Node.js', 'REST & GraphQL APIs', 'Responsive Design', 'Performance Optimization'],
    order: 1,
  },
  {
    _id: '2',
    title: 'Mobile Solutions',
    description: 'Cross-platform mobile apps that deliver seamless experiences on iOS and Android.',
    icon: 'mobile',
    features: ['React Native', 'Native Performance', 'Offline Support', 'Push Notifications'],
    order: 2,
  },
  {
    _id: '3',
    title: 'Cloud & DevOps',
    description: 'Scalable cloud infrastructure with automated deployment and monitoring.',
    icon: 'cloud',
    features: ['AWS & Azure', 'Docker & Kubernetes', 'CI/CD Pipelines', '24/7 Monitoring'],
    order: 3,
  },
  {
    _id: '4',
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces designed with user research and modern design principles.',
    icon: 'design',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    order: 4,
  },
  {
    _id: '5',
    title: 'Consulting',
    description: 'Strategic technology consulting to help you make the right architectural decisions.',
    icon: 'consulting',
    features: ['Tech Audits', 'Architecture Review', 'Team Training', 'Digital Strategy'],
    order: 5,
  },
  {
    _id: '6',
    title: 'Maintenance & Support',
    description: 'Ongoing support, updates, and maintenance to keep your systems running smoothly.',
    icon: 'support',
    features: ['Bug Fixes', 'Security Updates', 'Performance Tuning', 'SLA Support'],
    order: 6,
  },
];

router.get('/', async (_req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.json(services.length ? services : fallbackServices);
  } catch {
    res.json(fallbackServices);
  }
});

router.post('/', async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
