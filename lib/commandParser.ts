import { prisma } from "./prisma";

export async function parseCommand(input: string, visitorId: string) {
  const startTime = Date.now();
  const trimmed = input.trim();
  const [command, ...args] = trimmed.toLowerCase().split(" ");

  // Track analytics
  try {
    await prisma.analytics.create({
      data: {
        command,
        visitorId,
        responseTime: 0, // Will update after execution
      },
    });
  } catch (error) {
    // Silent fail for analytics
  }

  const commandMap: { [key: string]: () => Promise<any> | any } = {
    help: () => executeHelp(),
    about: () => executeAbout(),
    skills: () => executeSkills(),
    projects: () => executeProjects(args),
    project: () => executeProject(args[0]),
    experience: () => executeExperience(),
    education: () => executeEducation(),
    contact: () => executeContact(),
    blog: () => executeBlog(),
    achievements: () => executeAchievements(visitorId),
    theme: () => executeTheme(args[0]),
    whoami: () => executeWhoami(visitorId),
    neofetch: () => executeNeofetch(),
    ascii: () => executeAscii(args.join(" ")),
    matrix: () => ({ type: "matrix" }),
    snake: () => ({ type: "game", game: "snake" }),
    clear: () => ({ type: "clear" }),
    history: () => ({ type: "history" }),
    sudo: () => ({
      type: "error",
      message: "Nice try! You don't have sudo privileges here. 😏",
    }),
    exit: () => ({
      type: "info",
      message: "👋 Thanks for visiting! But you can't escape that easily...",
    }),
    search: () => executeSearch(args.join(" ")),
    stats: () => executeStats(),
    timeline: () => executeTimeline(),
    social: () => executeSocial(),
    "download resume": () => executeDownloadResume(),
    send: () => executeSend(args.join(" ")),
    guest: () => ({ type: "guestbook" }),
    joke: () => executeJoke(),
    quote: () => executeQuote(),
    ls: () => executeLs(args),
    cat: () => executeCat(args[0]),
    cowsay: () => executeCowsay(args.join(" ")),
    figlet: () => executeFiglet(args.join(" ")),
    sl: () => ({ type: "sl" }),
    cmatrix: () => ({ type: "matrix" }),
    fortune: () => executeFortune(),
    hack: () => executeHack(args),
    screenfetch: () => executeScreenfetch(),
    surf: () => executeSurf(),
  };

  const result = commandMap[command] || commandMap[trimmed];

  if (!result) {
    return {
      type: "error",
      message: `Command not found: ${command}. Type 'help' for available commands.`,
    };
  }

  const response = await result();
  const endTime = Date.now();

  // Update analytics with response time
  try {
    await prisma.analytics.updateMany({
      where: {
        command,
        visitorId,
        responseTime: 0,
      },
      data: {
        responseTime: endTime - startTime,
      },
    });
  } catch (error) {
    // Silent fail
  }

  return response;
}

function executeHelp() {
  return {
    type: "component",
    component: "Help",
  };
}

function executeAbout() {
  return {
    type: "component",
    component: "About",
  };
}

async function executeSkills() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { order: "asc" },
    });
    return {
      type: "component",
      component: "Skills",
      data: skills.length > 0 ? skills : undefined,
    };
  } catch (error) {
    console.error("Error fetching skills:", error);
    // Return component without data to use default skills
    return {
      type: "component",
      component: "Skills",
    };
  }
}

async function executeProjects(args: string[]) {
  try {
    const filter = args[0];

    // If filter provided, show available categories if invalid
    if (filter) {
      const categories = await prisma.project.findMany({
        select: { category: true },
        distinct: ["category"],
      });
      const validCategories = categories
        .map((c: any) => c.category)
        .filter(Boolean);

      const where = filter ? { category: filter } : {};
      const projects = await prisma.project.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });

      if (projects.length === 0 && validCategories.length > 0) {
        return {
          type: "error",
          message: `No projects found in category "${filter}"\n\nAvailable categories:\n${validCategories.map((c: any) => `  • ${c}`).join("\n")}\n\nUsage: projects [category]`,
        };
      }

      return {
        type: "component",
        component: "Projects",
        data: projects,
      };
    }

    // No filter, get all projects
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });

    return {
      type: "component",
      component: "Projects",
      data: projects,
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return {
      type: "component",
      component: "Projects",
    };
  }
}

async function executeProject(name: string) {
  if (!name) {
    try {
      const projects = await prisma.project.findMany({
        select: { name: true },
        take: 10,
      });
      const projectList =
        projects.length > 0
          ? projects.map((p: any) => `  • ${p.name}`).join("\n")
          : "  (No projects available)";
      return {
        type: "info",
        message: `📂 View Project Details\n\nUsage: project <name>\n\nAvailable projects:\n${projectList}\n\n💡 Tip: Type 'projects' to see all projects with details`,
      };
    } catch (error) {
      return {
        type: "info",
        message:
          "Usage: project <name>\n\nExample: project ecommerce\n\n💡 Type 'projects' to see all available projects",
      };
    }
  }

  try {
    const project = await prisma.project.findFirst({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });

    if (!project) {
      const allProjects = await prisma.project.findMany({
        select: { name: true },
        take: 5,
      });
      const suggestions =
        allProjects.length > 0
          ? `\n\nDid you mean:\n${allProjects.map((p: any) => `  • ${p.name}`).join("\n")}`
          : "";
      return {
        type: "error",
        message: `❌ Project not found: "${name}"${suggestions}`,
      };
    }

    return {
      type: "component",
      component: "ProjectDetail",
      data: project,
    };
  } catch (error) {
    console.error("Error fetching project:", error);
    return { type: "error", message: "Error loading project data" };
  }
}

async function executeExperience() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { order: "asc" },
    });
    return {
      type: "component",
      component: "Experience",
      data: experiences,
    };
  } catch (error) {
    console.error("Error fetching experience:", error);
    return {
      type: "component",
      component: "Experience",
    };
  }
}

async function executeEducation() {
  try {
    const education = await prisma.education.findMany({
      orderBy: { startDate: "desc" },
    });
    return {
      type: "component",
      component: "Education",
      data: education,
    };
  } catch (error) {
    console.error("Error fetching education:", error);
    return {
      type: "component",
      component: "Education",
    };
  }
}

function executeContact() {
  return {
    type: "component",
    component: "Contact",
  };
}

async function executeBlog() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    return {
      type: "component",
      component: "Blog",
      data: posts,
    };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return {
      type: "component",
      component: "Blog",
    };
  }
}

async function executeAchievements(visitorId: string) {
  try {
    const userAchievements = await prisma.userAchievement.findMany({
      where: { visitorId },
    });

    const achievementIds = userAchievements.map((ua) => ua.achievementId);
    const achievements = await prisma.achievement.findMany({
      where: { id: { in: achievementIds } },
    });

    // merge achievements into userAchievements by id
    const merged = userAchievements.map((ua) => ({
      ...ua,
      achievement: achievements.find((a) => a.id === ua.achievementId) || null,
    }));

    return {
      type: "component",
      component: "Achievements",
      data: merged,
    };
  } catch (error) {
    console.error("Error fetching achievements:", error);
    return {
      type: "component",
      component: "Achievements",
    };
  }
}

function executeTheme(theme: string) {
  const validThemes = [
    "classic",
    "matrix",
    "dracula",
    "nord",
    "cyberpunk",
    "hacker",
    "retro",
    "synthwave",
  ];

  if (!theme) {
    return {
      type: "info",
      message: `🎨 Available Themes:\n\n${validThemes.map((t) => `  • ${t}`).join("\n")}\n\nUsage: theme <name>\nExample: theme matrix`,
    };
  }

  if (!validThemes.includes(theme.toLowerCase())) {
    return {
      type: "error",
      message: `❌ Invalid theme: "${theme}"\n\n🎨 Available themes:\n${validThemes.map((t) => `  • ${t}`).join("\n")}\n\nExample: theme dracula`,
    };
  }

  return {
    type: "theme",
    theme: theme.toLowerCase(),
  };
}

async function executeWhoami(visitorId: string) {
  try {
    const visitor = await prisma.visitor.findUnique({
      where: { id: visitorId },
    });

    return {
      type: "component",
      component: "Whoami",
      data: visitor,
    };
  } catch (error) {
    console.error("Error fetching visitor data:", error);
    return {
      type: "component",
      component: "Whoami",
    };
  }
}

function executeNeofetch() {
  return {
    type: "component",
    component: "Neofetch",
  };
}

function executeAscii(text: string) {
  if (!text) {
    return {
      type: "info",
      message:
        "📝 ASCII Art Generator\n\nUsage: ascii <text>\n\nExamples:\n  • ascii HELLO\n  • ascii CODE\n  • ascii 2026",
    };
  }
  return {
    type: "component",
    component: "Ascii",
    data: { text },
  };
}

function executeSearch(query: string) {
  if (!query) {
    return {
      type: "info",
      message:
        "🔍 Search Portfolio\n\nUsage: search <query>\n\nExamples:\n  • search react\n  • search javascript\n  • search project",
    };
  }
  return {
    type: "component",
    component: "Search",
    data: { query },
  };
}

async function executeStats() {
  const [projectCount, skillCount, visitorCount] = await Promise.all([
    prisma.project.count(),
    prisma.skill.count(),
    prisma.visitor.count(),
  ]);

  return {
    type: "component",
    component: "Stats",
    data: { projectCount, skillCount, visitorCount },
  };
}

async function executeTimeline() {
  const experiences = await prisma.experience.findMany({
    orderBy: { startDate: "desc" },
  });
  return {
    type: "component",
    component: "Timeline",
    data: experiences,
  };
}

function executeSocial() {
  return {
    type: "component",
    component: "Social",
  };
}

function executeDownloadResume() {
  return {
    type: "download",
    url: "/resume.pdf",
  };
}

function executeSend(message: string) {
  if (!message) {
    return {
      type: "info",
      message:
        "📧 Quick Contact\n\nUsage: send <message>\n\nExample:\n  • send Hello! I'd like to discuss a project",
    };
  }
  return {
    type: "component",
    component: "SendMessage",
    data: { message },
  };
}

function executeJoke() {
  const jokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs!",
    "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?'",
    "Why do Java developers wear glasses? Because they don't C#!",
  ];
  return {
    type: "success",
    message: jokes[Math.floor(Math.random() * jokes.length)],
  };
}

function executeQuote() {
  const quotes = [
    "Code is like humor. When you have to explain it, it's bad. - Cory House",
    "First, solve the problem. Then, write the code. - John Johnson",
  ];
  return {
    type: "info",
    message: quotes[Math.floor(Math.random() * quotes.length)],
  };
}

function executeLs(args: string[]) {
  const files = [
    "about.txt",
    "skills.json",
    "projects/",
    "experience.md",
    "contact.vcf",
    ".secret",
  ];

  if (args.includes("-la") || args.includes("-a")) {
    return {
      type: "success",
      message: files.join("\n") + "\n.hidden_treasure\n.easter_egg",
    };
  }

  return {
    type: "success",
    message: files.filter((f) => !f.startsWith(".")).join("\n"),
  };
}

function executeCat(file: string) {
  const contents: { [key: string]: string } = {
    "secret.txt":
      "🎉 Congratulations! You found a secret. Achievement unlocked!",
    ".hidden_treasure": "💎 You found the hidden treasure! Keep exploring...",
  };

  if (!file) {
    return {
      type: "info",
      message:
        "📄 View File Contents\n\nUsage: cat <filename>\n\nAvailable files:\n  • secret.txt\n  • .hidden_treasure\n\n💡 Tip: Use 'ls -la' to discover hidden files!",
    };
  }

  return {
    type: contents[file] ? "success" : "error",
    message:
      contents[file] ||
      `❌ File not found: "${file}"\n\nAvailable files:\n  • secret.txt\n  • .hidden_treasure`,
  };
}

function executeCowsay(message: string) {
  if (!message) {
    message = "Hello from the terminal!";
  }
  return {
    type: "component",
    component: "Cowsay",
    data: { message },
  };
}

function executeFiglet(text: string) {
  if (!text) {
    return {
      type: "info",
      message:
        "📢 Large ASCII Text\n\nUsage: figlet <text>\n\nExamples:\n  • figlet WELCOME\n  • figlet CODE\n  • figlet HI",
    };
  }
  return {
    type: "component",
    component: "Figlet",
    data: { text },
  };
}

function executeFortune() {
  const fortunes = [
    "Your code will compile on the first try... eventually.",
    "A bug in the code is worth two in the documentation.",
    "You will solve a difficult problem today.",
  ];
  return {
    type: "info",
    message: fortunes[Math.floor(Math.random() * fortunes.length)],
  };
}

function executeHack(args: string[]) {
  const target = args.join(" ");
  const validTargets = ["pentagon", "fbi", "cia"];

  if (!target) {
    return {
      type: "info",
      message: `🕵️ Hacking Simulator\n\nUsage: hack <target>\n\nAvailable targets:\n${validTargets.map((t) => `  • ${t}`).join("\n")}\n\nExample: hack pentagon\n\n⚠️  Just for fun - no actual hacking!`,
    };
  }

  if (
    target.includes("pentagon") ||
    target.includes("fbi") ||
    target.includes("cia")
  ) {
    return {
      type: "component",
      component: "HackAnimation",
      data: { target },
    };
  }
  return {
    type: "error",
    message: `❌ Access denied to "${target}"\n\n🎯 Try one of these:\n${validTargets.map((t) => `  • hack ${t}`).join("\n")}`,
  };
}

function executeScreenfetch() {
  return {
    type: "component",
    component: "Screenfetch",
  };
}

function executeSurf() {
  return {
    type: "component",
    component: "DinoGuide",
  };
}
