#!/bin/bash

# Terminal Portfolio - Setup Script
# This script helps set up the project quickly

echo "🚀 Terminal Portfolio Setup Script"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js is installed: $(node --version)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm is installed: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""

# Check for .env file
if [ ! -f .env ]; then
    echo "⚠️  No .env file found. Creating from .env.example..."
    cp .env.example .env
    echo "✅ .env file created. Please update it with your credentials."
    echo ""
    echo "You need to add:"
    echo "  - NEXT_PUBLIC_SUPABASE_URL"
    echo "  - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "  - DATABASE_URL"
    echo ""
else
    echo "✅ .env file exists"
    echo ""
fi

# Generate Prisma Client
echo "🔨 Generating Prisma Client..."
npm run db:generate

if [ $? -eq 0 ]; then
    echo "✅ Prisma Client generated successfully"
else
    echo "❌ Failed to generate Prisma Client"
    exit 1
fi

echo ""
echo "=================================="
echo "✨ Setup Complete!"
echo "=================================="
echo ""
echo "Next steps:"
echo "1. Update .env with your credentials"
echo "2. Run 'npm run db:push' to set up the database"
echo "3. Run 'npx tsx prisma/seed.ts' to seed sample data (optional)"
echo "4. Run 'npm run dev' to start the development server"
echo ""
echo "For more information, check README.md and DEVELOPMENT.md"
echo ""
