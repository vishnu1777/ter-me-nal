"use client";

import { motion } from "framer-motion";
import { useTerminalStore } from "@/store/terminalStore";
import { themes } from "@/lib/utils";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  createdAt: Date;
  views: number;
}

interface BlogProps {
  data?: BlogPost[];
}

const defaultPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building a Terminal Portfolio with Next.js",
    excerpt:
      "Learn how to create an interactive terminal-style portfolio using Next.js, Framer Motion, and TypeScript.",
    tags: ["Next.js", "React", "TypeScript"],
    createdAt: new Date("2024-01-15"),
    views: 1234,
  },
  {
    id: "2",
    title: "Mastering Async JavaScript",
    excerpt:
      "Deep dive into promises, async/await, and common patterns for handling asynchronous operations.",
    tags: ["JavaScript", "Async", "Promises"],
    createdAt: new Date("2024-01-10"),
    views: 892,
  },
];

export default function Blog({ data = defaultPosts }: BlogProps) {
  const { theme } = useTerminalStore();
  const currentTheme = themes[theme];

  return (
    <div className="space-y-6">
      <div style={{ color: currentTheme.accent }} className="text-xl font-bold">
        📝 Blog Posts
      </div>

      {data.length === 0 ? (
        <div style={{ color: currentTheme.text }} className="opacity-60">
          No blog posts yet. Check back soon!
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border rounded p-4 hover:border-opacity-100 transition-all cursor-pointer border-opacity-30"
              style={{ borderColor: currentTheme.text }}
            >
              <div className="flex justify-between items-start mb-2">
                <div
                  style={{ color: currentTheme.accent }}
                  className="text-lg font-bold"
                >
                  {post.title}
                </div>
                <div
                  className="text-xs opacity-60"
                  style={{ color: currentTheme.text }}
                >
                  {post.views} views
                </div>
              </div>

              <p
                style={{ color: currentTheme.text }}
                className="opacity-80 mb-3"
              >
                {post.excerpt}
              </p>

              <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded"
                      style={{
                        backgroundColor: currentTheme.info,
                        color: currentTheme.bg,
                        opacity: 0.8,
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div
                  className="text-xs opacity-60"
                  style={{ color: currentTheme.text }}
                >
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
