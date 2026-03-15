# FrameCord

**Discord Widget Generator** - Create beautiful, customizable Discord server widget embeds for your website.

<p align="center">
  <img src="https://framecord.dev/api/generate?invite=discord" width="460" height="220" alt="FrameCord Widget Preview" />
</p>

## Features

- 🎨 **18 Beautiful Themes** - neon, minimal, animated, glass, terminal, cyberpunk, ocean, forest, sunset, retro, gradient, nature, elegant, candy, midnight, frost, galaxy, aurora
- 🌙 **Dark & Light Modes** - Switch between dark and light theme variants
- 🔧 **Fully Customizable** - Control what information to display and how it looks
- 📱 **Responsive Design** - Works great on all device sizes
- 🔗 **Easy Embedding** - Generate iframe embed codes with a single click
- ⚡ **API Access** - Programmatic access for advanced use cases

## Available Options

### Display Options
- Server icon
- Member count
- Online member count
- Server name
- Server description
- Server banner
- Server badge (Nitro)

### Styling Options
- Logo border radius (0-24)
- Button border radius (0-24)
- Card border radius (0-24)
- Button color (hex code)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## API Documentation

FrameCord provides API endpoints for programmatic usage:

### Generate Embed Code
```
GET /api/generate?invite={inviteCode}&theme={themeName}&themeMode={dark|light}&...
```

### Get Server Info
```
GET /api/server?id={serverId}
```

### List Available Themes
```
GET /api/themes
```

For detailed API documentation, visit `/docs` in your local development environment.

## Tech Stack

- **Framework:** Next.js 16
- **UI Library:** Chakra UI v3
- **Animation:** Framer Motion
- **Language:** TypeScript

## License

MIT License