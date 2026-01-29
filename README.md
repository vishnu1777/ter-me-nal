# 🖥️ Terminal Portfolio

A stunning, fully interactive terminal-style portfolio website that mimics a Linux terminal experience. Built with Next.js 14, TypeScript, Prisma, Supabase, and Framer Motion.

![Terminal Portfolio](https://via.placeholder.com/1200x630?text=Terminal+Portfolio)

## ✨ Features

### Core Features

- **Authentic Terminal Design** - Phosphor green text on dark background with blinking cursor
- **Command System** - 30+ built-in commands including help, about, skills, projects, etc.
- **Multiple Themes** - 8 color schemes (Classic, Matrix, Dracula, Nord, Cyberpunk, etc.)
- **Command History** - Navigate through previous commands with up/down arrows
- **Tab Autocomplete** - Press tab to autocomplete commands
- **Easter Eggs** - Hidden commands and surprises throughout

### Interactive Elements

- **Snake Game** - Play snake directly in the terminal
- **Matrix Rain** - Animated Matrix-style falling characters
- **Hack Animation** - Simulated hacking sequences
- **ASCII Art** - Generate ASCII art and figlet text
- **Typewriter Effects** - Smooth character-by-character animations

### Database & Analytics

- **Visitor Tracking** - Track visitors and their interactions
- **Analytics Dashboard** - View command usage and statistics
- **Guestbook** - Let visitors leave messages
- **Achievement System** - Unlock achievements by exploring

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Language**: TypeScript

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/terminal-portfolio.git
cd terminal-portfolio
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Database (from Supabase)
DATABASE_URL=your_postgresql_connection_string
```

4. **Set up the database**

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push
```

5. **Seed the database (optional)**

Create sample data by running the seed script or manually adding data through Prisma Studio:

```bash
npm run db:studio
```

6. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎮 Available Commands

### Information Commands

- `help` - Display all available commands
- `about` - Show bio and introduction
- `skills` - Display technical skills with proficiency bars
- `projects` - List all projects
- `project [name]` - View detailed project information
- `experience` - Show work experience timeline
- `education` - Display educational background
- `contact` - Show contact information
- `blog` - List blog posts

### Interactive Commands

- `whoami` - Display visitor information
- `neofetch` - System info in neofetch style
- `screenfetch` - Alternative system information display
- `stats` - Show portfolio statistics
- `timeline` - Interactive career timeline
- `achievements` - View unlocked achievements

### Fun Commands

- `snake` - Play snake game
- `matrix` / `cmatrix` - Matrix rain animation
- `ascii [text]` - Generate ASCII art
- `figlet [text]` - Large ASCII text
- `cowsay [message]` - ASCII cow speaks
- `joke` - Random developer joke
- `quote` - Inspirational tech quote
- `fortune` - Fortune cookie message
- `hack [target]` - Fake hacking animation

### System Commands

- `theme [name]` - Change color theme
- `clear` - Clear terminal screen
- `history` - Show command history
- `ls [-la]` - List directory contents
- `cat [file]` - Display file contents
- `social` - Open social media links
- `download resume` - Download resume as PDF
- `exit` - Display farewell message

## 🎨 Themes

Choose from 8 carefully crafted color schemes:

- **Classic** - Traditional green on black
- **Matrix** - Bright green with digital rain
- **Dracula** - Purple and pink accents
- **Nord** - Cool blue tones
- **Cyberpunk** - Neon yellow and magenta
- **Hacker** - Green with glow effect
- **Retro** - Amber monochrome
- **Synthwave** - Pink and blue gradient

Use `theme [name]` to switch themes.

## 🗄️ Database Schema

The project uses Prisma with PostgreSQL. Main models:

- **Project** - Portfolio projects
- **Skill** - Technical skills
- **Experience** - Work history
- **Education** - Academic background
- **Visitor** - Visitor tracking
- **Analytics** - Command analytics
- **Guestbook** - Visitor messages
- **Achievement** - Unlockable achievements
- **BlogPost** - Blog articles

## 🎯 Customization

### Update Your Information

1. **Add your projects** - Use Prisma Studio or create migrations
2. **Update skills** - Modify skill entries in the database
3. **Change contact info** - Edit `components/Commands/Contact.tsx`
4. **Customize about section** - Edit `components/Commands/About.tsx`
5. **Add your resume** - Place PDF in `public/resume.pdf`

### Modify Commands

Commands are defined in `lib/commandParser.ts`. You can:

- Add new commands
- Modify existing command behavior
- Create custom responses

### Create New Themes

Add themes in `lib/utils.ts` in the `themes` object:

```typescript
myTheme: {
  name: 'My Theme',
  bg: '#000000',
  text: '#ffffff',
  prompt: '#00ff00',
  error: '#ff0000',
  warning: '#ffff00',
  info: '#00ffff',
  accent: '#ff00ff',
}
```

## 📱 Responsive Design

The terminal adapts to different screen sizes:

- **Desktop**: Full terminal experience
- **Tablet**: Simplified layout with touch support
- **Mobile**: Command shortcuts and touch-friendly interface

## ⚡ Performance

- Lazy loading for command outputs
- Optimized animations with Framer Motion
- Efficient database queries with Prisma
- Next.js Image optimization
- Code splitting for games and features

## 🔒 Security

- Environment variables for sensitive data
- Rate limiting on API routes (recommended)
- Guestbook moderation system
- SQL injection protection via Prisma

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Database Setup

Ensure your Supabase database is:

- Properly configured with connection pooling
- Schema pushed via `npx prisma db push`
- Firewall rules configured

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

- Email: hello@example.com
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourname)

## 🎉 Acknowledgments

- Inspired by classic Unix terminals
- Matrix effect inspired by The Matrix
- ASCII art from various sources
- Built with amazing open-source tools

---

Made with ❤️ and lots of ☕

**Star ⭐ this repo if you found it helpful!**
