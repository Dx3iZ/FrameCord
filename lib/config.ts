export type ThemeName = "neon" | "minimal" | "animated" | "glass" | "terminal" | "cyberpunk" | "ocean" | "forest" | "sunset" | "retro" | "gradient" | "nature" | "elegant" | "candy" | "midnight" | "frost" | "galaxy" | "aurora"

export type AppConfig = {
  invite?: string
  theme?: ThemeName
  themeMode?: "dark" | "light"
  showIcon?: boolean
  showMembers?: boolean
  showOnline?: boolean
  showGuildName?: boolean
  showDescription?: boolean
  showBanner?: boolean
  showBadge?: boolean
  // Separate border radius for each element
  logoRadius?: number
  buttonRadius?: number
  cardRadius?: number
  // Button color
  buttonColor?: string
}

export function encodeConfig(config: AppConfig) {
  return btoa(JSON.stringify(config))
}

export function decodeConfig(str: string): AppConfig {
  return JSON.parse(atob(str)) as AppConfig
}
