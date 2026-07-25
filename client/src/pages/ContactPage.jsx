import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { submitContact } from '../utils/api';
import Contact from '../components/Contact';

export default function ContactPage() {

  return (
    <Contact />
  );
}
