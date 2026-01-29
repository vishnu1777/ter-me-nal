import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data
  await prisma.userAchievement.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.analytics.deleteMany();
  await prisma.guestbook.deleteMany();
  await prisma.visitor.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.education.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.project.deleteMany();

  // Seed Projects
  console.log("📦 Seeding projects...");
  await prisma.project.createMany({
    data: [
      {
        name: "E-Commerce Platform",
        description:
          "Full-stack e-commerce solution with real-time inventory management",
        longDesc:
          "A comprehensive e-commerce platform built with Next.js and Stripe integration. Features include real-time inventory tracking, order management, customer analytics, and a responsive admin dashboard. The platform handles 10k+ daily transactions with 99.9% uptime.",
        tech: [
          "Next.js",
          "TypeScript",
          "Stripe",
          "PostgreSQL",
          "Redis",
          "Docker",
        ],
        github: "https://github.com/username/ecommerce",
        live: "https://demo-ecommerce.example.com",
        featured: true,
        category: "Web App",
        startDate: new Date("2023-01-15"),
        endDate: new Date("2023-06-30"),
      },
      {
        name: "AI Chat Application",
        description: "Real-time chat application with AI-powered responses",
        longDesc:
          "An intelligent chat application leveraging OpenAI GPT-4 for contextual responses. Features real-time messaging with Socket.io, conversation history, user authentication, and custom AI training. Successfully deployed to 5000+ active users.",
        tech: ["React", "Node.js", "Socket.io", "OpenAI", "MongoDB", "Express"],
        github: "https://github.com/username/ai-chat",
        live: "https://chat.example.com",
        featured: true,
        category: "AI/ML",
        startDate: new Date("2023-07-01"),
        endDate: new Date("2023-11-30"),
      },
      {
        name: "Task Management System",
        description: "Collaborative task manager with kanban boards",
        longDesc:
          "A feature-rich project management tool with drag-and-drop kanban boards, time tracking, team collaboration, and detailed analytics. Supports multiple projects, custom workflows, and integrations with popular tools.",
        tech: ["Vue.js", "Express", "MongoDB", "Redis", "WebSocket"],
        github: "https://github.com/username/taskman",
        featured: false,
        category: "Productivity",
        startDate: new Date("2022-09-01"),
        endDate: new Date("2023-01-15"),
      },
    ],
  });

  // Seed Skills
  console.log("🚀 Seeding skills...");
  await prisma.skill.createMany({
    data: [
      {
        name: "JavaScript/TypeScript",
        category: "Languages",
        proficiency: 95,
        yearsExp: 5,
        order: 1,
      },
      {
        name: "Python",
        category: "Languages",
        proficiency: 85,
        yearsExp: 4,
        order: 2,
      },
      {
        name: "Go",
        category: "Languages",
        proficiency: 75,
        yearsExp: 2,
        order: 3,
      },
      {
        name: "React/Next.js",
        category: "Frontend",
        proficiency: 90,
        yearsExp: 5,
        order: 4,
      },
      {
        name: "Vue.js",
        category: "Frontend",
        proficiency: 80,
        yearsExp: 3,
        order: 5,
      },
      {
        name: "Tailwind CSS",
        category: "Frontend",
        proficiency: 90,
        yearsExp: 3,
        order: 6,
      },
      {
        name: "Node.js/Express",
        category: "Backend",
        proficiency: 90,
        yearsExp: 5,
        order: 7,
      },
      {
        name: "Django/FastAPI",
        category: "Backend",
        proficiency: 80,
        yearsExp: 3,
        order: 8,
      },
      {
        name: "PostgreSQL",
        category: "Database",
        proficiency: 85,
        yearsExp: 4,
        order: 9,
      },
      {
        name: "MongoDB",
        category: "Database",
        proficiency: 80,
        yearsExp: 4,
        order: 10,
      },
      {
        name: "Redis",
        category: "Database",
        proficiency: 75,
        yearsExp: 3,
        order: 11,
      },
      {
        name: "Docker/Kubernetes",
        category: "DevOps",
        proficiency: 75,
        yearsExp: 3,
        order: 12,
      },
      {
        name: "AWS/GCP",
        category: "Cloud",
        proficiency: 80,
        yearsExp: 4,
        order: 13,
      },
      {
        name: "CI/CD",
        category: "DevOps",
        proficiency: 85,
        yearsExp: 4,
        order: 14,
      },
      {
        name: "GraphQL",
        category: "API",
        proficiency: 85,
        yearsExp: 3,
        order: 15,
      },
      {
        name: "REST APIs",
        category: "API",
        proficiency: 90,
        yearsExp: 5,
        order: 16,
      },
    ],
  });

  // Seed Experience
  console.log("💼 Seeding experience...");
  await prisma.experience.createMany({
    data: [
      {
        company: "Tech Innovations Inc.",
        position: "Senior Full-Stack Developer",
        description:
          "Led development of microservices architecture serving 1M+ users. Mentored junior developers and established best practices. Improved system performance by 40% through optimization. Managed team of 5 developers and coordinated with product team.",
        startDate: new Date("2022-01-15"),
        current: true,
        location: "Remote",
        tech: ["React", "Node.js", "PostgreSQL", "AWS", "Docker", "Kubernetes"],
        order: 1,
      },
      {
        company: "StartupXYZ",
        position: "Full-Stack Developer",
        description:
          "Built and deployed multiple web applications from scratch. Implemented CI/CD pipelines reducing deployment time by 60%. Developed RESTful APIs and integrated third-party services. Contributed to architectural decisions.",
        startDate: new Date("2020-03-01"),
        endDate: new Date("2021-12-31"),
        current: false,
        location: "San Francisco, CA",
        tech: ["Vue.js", "Express", "MongoDB", "Docker", "Jenkins"],
        order: 2,
      },
      {
        company: "Digital Agency Co.",
        position: "Frontend Developer",
        description:
          "Developed responsive websites for various clients using modern frameworks. Collaborated with designers to create pixel-perfect implementations. Optimized web performance achieving 95+ Lighthouse scores. Maintained client relationships.",
        startDate: new Date("2018-06-01"),
        endDate: new Date("2020-02-28"),
        current: false,
        location: "New York, NY",
        tech: ["React", "TypeScript", "SCSS", "Webpack", "Git"],
        order: 3,
      },
    ],
  });

  // Seed Education
  console.log("🎓 Seeding education...");
  await prisma.education.createMany({
    data: [
      {
        institution: "University of Technology",
        degree: "Bachelor of Science",
        field: "Computer Science",
        startDate: new Date("2014-09-01"),
        endDate: new Date("2018-05-31"),
        current: false,
        description:
          "Focused on software engineering, algorithms, and database systems. Completed senior project on distributed systems.",
        gpa: "3.8/4.0",
      },
      {
        institution: "Tech Academy",
        degree: "Full-Stack Web Development",
        field: "Web Development",
        startDate: new Date("2017-06-01"),
        endDate: new Date("2017-12-31"),
        current: false,
        description:
          "Intensive bootcamp covering modern web development technologies and best practices.",
      },
    ],
  });

  // Seed Achievements
  console.log("🏆 Seeding achievements...");
  await prisma.achievement.createMany({
    data: [
      {
        name: "First Command",
        description: "Executed your first command in the terminal",
        icon: "🎯",
        condition: "execute_first_command",
        rarity: "common",
        points: 10,
      },
      {
        name: "Explorer",
        description:
          "Viewed all main sections (about, skills, projects, experience)",
        icon: "🗺️",
        condition: "view_all_sections",
        rarity: "rare",
        points: 25,
      },
      {
        name: "Theme Master",
        description: "Tried all available themes",
        icon: "🎨",
        condition: "try_all_themes",
        rarity: "epic",
        points: 50,
      },
      {
        name: "Easter Egg Hunter",
        description: "Found a hidden easter egg",
        icon: "🥚",
        condition: "find_easter_egg",
        rarity: "rare",
        points: 30,
      },
      {
        name: "Power User",
        description: "Executed 50+ commands",
        icon: "⚡",
        condition: "execute_50_commands",
        rarity: "epic",
        points: 40,
      },
      {
        name: "Snake Champion",
        description: "Score 100+ points in Snake game",
        icon: "🐍",
        condition: "snake_score_100",
        rarity: "legendary",
        points: 100,
      },
    ],
  });

  // Seed Blog Posts
  console.log("📝 Seeding blog posts...");
  await prisma.blogPost.createMany({
    data: [
      {
        title: "Building a Terminal Portfolio with Next.js",
        slug: "building-terminal-portfolio-nextjs",
        excerpt:
          "Learn how to create an interactive terminal-style portfolio using Next.js, Framer Motion, and TypeScript. A complete guide from setup to deployment.",
        content: "Full blog post content would go here...",
        published: true,
        tags: ["Next.js", "React", "TypeScript", "Portfolio"],
        views: 1234,
      },
      {
        title: "Mastering Async JavaScript: Promises and Async/Await",
        slug: "mastering-async-javascript",
        excerpt:
          "Deep dive into promises, async/await, and common patterns for handling asynchronous operations in modern JavaScript applications.",
        content: "Full blog post content would go here...",
        published: true,
        tags: ["JavaScript", "Async", "Promises", "Tutorial"],
        views: 892,
      },
      {
        title: "PostgreSQL Performance Optimization Tips",
        slug: "postgresql-performance-optimization",
        excerpt:
          "Practical tips and techniques for optimizing PostgreSQL database performance, from indexing strategies to query optimization.",
        content: "Full blog post content would go here...",
        published: true,
        tags: ["PostgreSQL", "Database", "Performance", "Optimization"],
        views: 567,
      },
    ],
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
