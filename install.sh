#!/bin/bash

# Terminal Portfolio - Complete Installation & Setup
# Run this script to set up everything automatically

set -e  # Exit on any error

echo "╔════════════════════════════════════════════════╗"
echo "║                                                ║"
echo "║   Terminal Portfolio - Complete Setup          ║"
echo "║                                                ║"
echo "╚════════════════════════════════════════════════╝"
echo ""

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check Node.js
echo -e "${BLUE}[1/8]${NC} Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js not found. Please install Node.js 18+${NC}"
    exit 1
fi
NODE_VERSION=$(node -v)
echo -e "${GREEN}✓ Node.js installed: $NODE_VERSION${NC}"
echo ""

# Check npm
echo -e "${BLUE}[2/8]${NC} Checking npm..."
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm not found${NC}"
    exit 1
fi
NPM_VERSION=$(npm -v)
echo -e "${GREEN}✓ npm installed: $NPM_VERSION${NC}"
echo ""

# Install dependencies
echo -e "${BLUE}[3/8]${NC} Installing dependencies..."
echo -e "${YELLOW}This may take a few minutes...${NC}"
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependencies installed${NC}"
else
    echo -e "${RED}✗ Failed to install dependencies${NC}"
    exit 1
fi
echo ""

# Create .env if it doesn't exist
echo -e "${BLUE}[4/8]${NC} Setting up environment variables..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${GREEN}✓ .env file created${NC}"
    echo -e "${YELLOW}⚠ Please update .env with your credentials:${NC}"
    echo -e "  - NEXT_PUBLIC_SUPABASE_URL"
    echo -e "  - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo -e "  - DATABASE_URL"
    echo ""
    echo -e "${YELLOW}Press Enter when you've updated .env, or Ctrl+C to exit${NC}"
    read
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi
echo ""

# Generate Prisma Client
echo -e "${BLUE}[5/8]${NC} Generating Prisma Client..."
npm run db:generate
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Prisma Client generated${NC}"
else
    echo -e "${RED}✗ Failed to generate Prisma Client${NC}"
    echo -e "${YELLOW}Make sure your DATABASE_URL in .env is correct${NC}"
    exit 1
fi
echo ""

# Push database schema
echo -e "${BLUE}[6/8]${NC} Pushing database schema..."
echo -e "${YELLOW}This will create tables in your database${NC}"
npm run db:push
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Database schema created${NC}"
else
    echo -e "${RED}✗ Failed to push database schema${NC}"
    echo -e "${YELLOW}Check your DATABASE_URL and ensure database is accessible${NC}"
    exit 1
fi
echo ""

# Optional: Seed database
echo -e "${BLUE}[7/8]${NC} Would you like to seed the database with sample data?"
echo -e "${YELLOW}This is useful for testing (y/n)?${NC}"
read -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npx tsx prisma/seed.ts
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Database seeded with sample data${NC}"
    else
        echo -e "${YELLOW}⚠ Failed to seed database (non-critical)${NC}"
    fi
else
    echo -e "${YELLOW}⊘ Skipping database seed${NC}"
fi
echo ""

# Make setup.sh executable
echo -e "${BLUE}[8/8]${NC} Finalizing setup..."
chmod +x setup.sh 2>/dev/null || true
echo -e "${GREEN}✓ Setup complete!${NC}"
echo ""

# Success message
echo "╔════════════════════════════════════════════════╗"
echo "║                                                ║"
echo "║          ✨ Installation Complete! ✨          ║"
echo "║                                                ║"
echo "╚════════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}Your terminal portfolio is ready!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Customize your information:"
echo "   - Edit components/Commands/About.tsx"
echo "   - Edit components/Commands/Contact.tsx"
echo "   - Add projects via: npm run db:studio"
echo ""
echo "2. Start development server:"
echo -e "   ${YELLOW}npm run dev${NC}"
echo ""
echo "3. Open your browser:"
echo -e "   ${YELLOW}http://localhost:3000${NC}"
echo ""
echo "4. Type 'help' in the terminal to see all commands!"
echo ""
echo -e "${BLUE}Documentation:${NC}"
echo "   README.md         - Full documentation"
echo "   QUICKSTART.md     - Quick start guide"
echo "   DEVELOPMENT.md    - Customization guide"
echo "   DEPLOYMENT.md     - Deploy instructions"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
echo ""
