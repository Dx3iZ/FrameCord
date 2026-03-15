import { encodeConfig, type ThemeName } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";

const validThemes: ThemeName[] = [
  "neon",
  "minimal",
  "animated",
  "glass",
  "terminal",
  "cyberpunk",
  "ocean",
  "forest",
  "sunset",
  "retro",
  "gradient",
  "nature",
  "elegant",
  "candy",
  "midnight",
  "frost",
  "galaxy",
  "aurora",
];

// Default configuration
const defaultConfig = {
  theme: "neon" as ThemeName,
  themeMode: "dark" as const,
  showIcon: true,
  showMembers: true,
  showOnline: true,
  showGuildName: true,
  showDescription: true,
  showBanner: true,
  showBadge: true,
  logoRadius: 8,
  buttonRadius: 6,
  cardRadius: 12,
  buttonColor: "#a855f7",
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Get parameters - invite is now REQUIRED
    const invite = searchParams.get("invite");
    
    // Validate invite code - REQUIRED
    if (!invite || invite.trim() === "") {
      return NextResponse.json(
        { error: true, message: "Invite code is required. Please provide a valid Discord invite code.", code: "MISSING_INVITE" },
        { status: 400 }
      );
    }
    
    // Extract invite code from various formats (URLs, with/without protocol)
    const inviteCode = invite.trim()
      .replace(/^https?:\/\//, "") // Remove protocol
      .replace(/^www\./, "") // Remove www
      .replace(/^discord\.gg\//, "") // Remove discord.gg/ prefix
      .replace(/^discord\.com\/invite\//, "") // Remove discord.com/invite/ prefix
      .split(/[?#]/)[0] // Remove query params and hash
      .trim();
    
    // Validate extracted invite code format
    if (!inviteCode || !/^[a-zA-Z0-9_-]+$/.test(inviteCode)) {
      return NextResponse.json(
        { error: true, message: "Invalid invite code format. Use a valid Discord invite code (e.g., abc123 or discord.gg/abc123)", code: "INVALID_INVITE_FORMAT" },
        { status: 400 }
      );
    }
    const theme = (searchParams.get("theme") || defaultConfig.theme) as ThemeName;
    const themeMode = (searchParams.get("themeMode") || defaultConfig.themeMode) as "dark" | "light";
    const showIcon = searchParams.get("showIcon") !== "false";
    const showMembers = searchParams.get("showMembers") !== "false";
    const showOnline = searchParams.get("showOnline") !== "false";
    const showGuildName = searchParams.get("showGuildName") !== "false";
    const showDescription = searchParams.get("showDescription") !== "false";
    const showBanner = searchParams.get("showBanner") !== "false";
    const showBadge = searchParams.get("showBadge") !== "false";
    const logoRadius = Math.min(24, Math.max(0, parseInt(searchParams.get("logoRadius") || String(defaultConfig.logoRadius), 10)));
    const buttonRadius = Math.min(24, Math.max(0, parseInt(searchParams.get("buttonRadius") || String(defaultConfig.buttonRadius), 10)));
    const cardRadius = Math.min(24, Math.max(0, parseInt(searchParams.get("cardRadius") || String(defaultConfig.cardRadius), 10)));
    const buttonColor = searchParams.get("buttonColor") || defaultConfig.buttonColor;
    
    // Get format parameter (json or live)
    const format = (searchParams.get("format") || "json") as "json" | "live";
    
    // Validate format
    if (format !== "json" && format !== "live") {
      return NextResponse.json(
        { error: true, message: "Format must be 'json' or 'live'", code: "INVALID_FORMAT" },
        { status: 400 }
      );
    }

    // Validate theme
    if (!validThemes.includes(theme)) {
      return NextResponse.json(
        { error: true, message: `Invalid theme. Valid themes: ${validThemes.join(", ")}`, code: "INVALID_THEME" },
        { status: 400 }
      );
    }

    // Validate themeMode
    if (themeMode !== "dark" && themeMode !== "light") {
      return NextResponse.json(
        { error: true, message: "Theme mode must be 'dark' or 'light'", code: "INVALID_THEME_MODE" },
        { status: 400 }
      );
    }

    // Validate buttonColor - only allow safe hex colors
    const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
    if (!hexColorRegex.test(buttonColor)) {
      return NextResponse.json(
        { error: true, message: "Button color must be a valid hex color (e.g., #a855f7)", code: "INVALID_COLOR" },
        { status: 400 }
      );
    }

    // Create config object - preserve original invite for the join button
    const config = {
      theme,
      themeMode,
      showIcon,
      showMembers,
      showOnline,
      showGuildName,
      showDescription,
      showBanner,
      showBadge,
      logoRadius,
      buttonRadius,
      cardRadius,
      buttonColor,
      inviteCode: inviteCode,
    };

    // Encode config to base64
    const encodedConfig = encodeConfig(config);
    
    // Use extracted invite code
    const serverId = inviteCode;
    const widgetPath = `/w/${serverId}?c=${encodeURIComponent(encodedConfig)}`;

    // Build full URL (use request URL for host)
    const baseUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}`;
    const fullUrl = `${baseUrl}${widgetPath}`;

    // If format is "live", redirect directly to the preview URL
    if (format === "live") {
      return NextResponse.redirect(fullUrl);
    }

    // Default: json format - return full JSON response
    const embedCode = `<iframe src="${fullUrl}" width="460" height="220" frameborder="0" allowtransparency="true"></iframe>`;

    return NextResponse.json({
      success: true,
      embedCode,
      previewUrl: fullUrl,
      config,
      widgetPath,
      baseUrl,
      usage: {
        description: "Use this embed code to display the Discord widget on your website",
        parameters: {
          invite: "Discord invite code (REQUIRED)",
          theme: `Theme name (default: ${defaultConfig.theme})`,
          themeMode: "dark or light (default: dark)",
          format: "Response format: 'json' (default) returns JSON, 'live' redirects to preview",
          showIcon: "true or false",
          showMembers: "true or false",
          showOnline: "true or false",
          showGuildName: "true or false",
          showDescription: "true or false",
          showBanner: "true or false",
          showBadge: "true or false",
          logoRadius: "0-24 (default: 8)",
          buttonRadius: "0-24 (default: 6)",
          cardRadius: "0-24 (default: 12)",
          buttonColor: "Hex color (default: #a855f7)",
        },
        example: {
          full: `${baseUrl}/api/generate?invite=abc123&theme=neon&themeMode=dark`,
          minimal: `${baseUrl}/api/generate?invite=abc123&theme=ocean`,
          live: `${baseUrl}/api/generate?invite=abc123&theme=ocean&format=live`,
          markdown: `[![Discord Widget](${baseUrl}/api/generate?invite=abc123&theme=ocean&format=live)](${baseUrl}/w/abc123)`,
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: true,
        message: error instanceof Error ? error.message : "Unknown error",
        code: "INTERNAL_ERROR",
      },
      { status: 500 }
    );
  }
}
