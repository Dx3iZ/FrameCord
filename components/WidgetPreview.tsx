import AnimatedTheme from "@/themes/animated"
import MinimalTheme from "@/themes/minimal"
import NeonTheme from "@/themes/neon"
import GlassTheme from "@/themes/glass"
import TerminalTheme from "@/themes/terminal"
import CyberpunkTheme from "@/themes/cyberpunk"
import OceanTheme from "@/themes/ocean"
import ForestTheme from "@/themes/forest"
import SunsetTheme from "@/themes/sunset"
import RetroTheme from "@/themes/retro"
import GradientTheme from "@/themes/gradient"
import NatureTheme from "@/themes/nature"
import ElegantTheme from "@/themes/elegant"
import CandyTheme from "@/themes/candy"
import MidnightTheme from "@/themes/midnight"
import FrostTheme from "@/themes/frost"
import GalaxyTheme from "@/themes/galaxy"
import AuroraTheme from "@/themes/aurora"
import { Box, EmptyState, VStack } from "@chakra-ui/react"
import { HiColorSwatch } from "react-icons/hi"
import { FaFilterCircleXmark } from "react-icons/fa6"

type DiscordWidgetData = {
  guild?: {
    id?: string
    name?: string
    icon?: string | null
    banner?: string | null
    description?: string
    region?: string
    vanity_url_code?: string
    features?: string[]
  }
  approximate_member_count?: number
  approximate_presence_count?: number
  invites?: Record<string, unknown>
  instant_invite?: string | null
  profile?: {
    badge_hash?: string | null
    tag?: string | null
  }
  [key: string]: unknown
}

type WidgetPreviewProps = {
  data?: DiscordWidgetData | null
  theme: "neon" | "minimal" | "animated" | "glass" | "terminal" | "cyberpunk" | "ocean" | "forest" | "sunset" | string
  showIcon?: boolean
  showBanner?: boolean
  showBadge?: boolean
  showMembers?: boolean
  showOnline?: boolean
  showGuildName?: boolean
  showDescription?: boolean
  logoRadius?: number
  buttonRadius?: number
  cardRadius?: number
  buttonColor?: string
  themeMode?: "dark" | "light"
  inviteUrl?: string
}

const themeMap: Record<string, React.ComponentType<any>> = {
  neon: NeonTheme,
  minimal: MinimalTheme,
  animated: AnimatedTheme,
  glass: GlassTheme,
  terminal: TerminalTheme,
  cyberpunk: CyberpunkTheme,
  ocean: OceanTheme,
  forest: ForestTheme,
  sunset: SunsetTheme,
  retro: RetroTheme,
  gradient: GradientTheme,
  nature: NatureTheme,
  elegant: ElegantTheme,
  candy: CandyTheme,
  midnight: MidnightTheme,
  frost: FrostTheme,
  galaxy: GalaxyTheme,
  aurora: AuroraTheme,
}

const defaultIcon = "https://placeholdit.com/100x100/dddddd/999999?text=No+Icon"

export default function WidgetPreview({
  data,
  theme,
  showIcon = true,
  showMembers = true,
  showOnline = true,
  showGuildName = true,
  showDescription = true,
  showBanner = true,
  showBadge = true,
  logoRadius = 8,
  buttonRadius = 6,
  cardRadius = 12,
  buttonColor,
  themeMode = "dark",
  inviteUrl: inviteUrlProp,
}: WidgetPreviewProps) {
  if (!data || !data.guild) {
    return (
      <EmptyState.Root>
        <EmptyState.Content>
          <EmptyState.Indicator>
            <FaFilterCircleXmark />
          </EmptyState.Indicator>
          <VStack textAlign="center">
            <EmptyState.Title>Server data not loaded.</EmptyState.Title>
            <EmptyState.Description>
              Enter a Discord invite and click &quot;Load Server&quot;.
            </EmptyState.Description>
          </VStack>
        </EmptyState.Content>
      </EmptyState.Root>
    )
  }

  const guildId = data.guild.id ?? ""
  const guildName = data.guild.name ?? "Unknown Server"
  const members = data.approximate_member_count ?? 0
  const online = data.approximate_presence_count ?? 0
  const description = data.guild.description ?? ""
  
  // Get the invite URL for the join button - prefer passed prop, then instant_invite, fallback to vanity URL or generated
  let inviteUrl: string | undefined = inviteUrlProp
  if (!inviteUrl) {
    if (data.instant_invite) {
      inviteUrl = data.instant_invite
    } else if (data.guild.vanity_url_code) {
      inviteUrl = `https://discord.gg/${data.guild.vanity_url_code}`
    }
  }

  const iconUrl = data.guild.icon
    ? `https://cdn.discordapp.com/icons/${guildId}/${data.guild.icon}?size=4096`
    : defaultIcon
  
  const bannerUrl = data.guild.banner
    ? `https://cdn.discordapp.com/banners/${guildId}/${data.guild.banner}?size=4096`
    : undefined
  const badgeUrl = data.profile?.badge_hash
    ? `https://cdn.discordapp.com/clan-badges/${guildId}/${data.profile?.badge_hash}?size=4096`
    : undefined
  const badgeLabel = data.profile?.tag ?? ""

  const props = {
    name: showGuildName ? guildName : "",
    members: showMembers ? members : 0,
    online: showOnline ? online : 0,
    icon: showIcon ? iconUrl : undefined,
    description: showDescription ? description : "",
    banner: showBanner ? bannerUrl : undefined,
    badgeIcon: showBadge ? badgeUrl : undefined,
    badgeLabel: showBadge ? badgeLabel : "",
    logoRadius,
    buttonRadius,
    cardRadius,
    buttonColor,
    themeMode,
    inviteUrl,
  }

  const ThemeComponent = themeMap[theme] || NeonTheme

  return (
    <Box position="relative" maxW={500} rounded="xl" borderColor="transparent" bg="transparent" w="450px">
      <ThemeComponent {...props} />
    </Box>
  )
}
