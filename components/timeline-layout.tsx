"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface TimelineItem {
  date: string
  category: string
  content: ReactNode
}

interface TimelineLayoutProps {
  items: TimelineItem[]
  title: string
  description: string
}

export default function TimelineLayout({ items, title, description }: TimelineLayoutProps) {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div className="container px-4 md:px-6 py-12">
      <motion.div
        className="max-w-3xl mx-auto text-center space-y-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold tracking-tighter">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </motion.div>

      <motion.div
        className="max-w-4xl mx-auto space-y-12"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] gap-4 md:gap-8 items-start"
            variants={fadeIn}
          >
            <div className="space-y-2">
              <div className="text-sm font-medium text-primary">{item.date}</div>
              <div className="text-xs text-muted-foreground">{item.category}</div>
              <div className="hidden md:block h-full w-px bg-border mx-auto mt-4"></div>
            </div>
            <div>{item.content}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
