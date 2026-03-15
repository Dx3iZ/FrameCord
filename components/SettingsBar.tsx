import { Accordion, Box, Button, CodeBlock, ColorPicker, ColorPickerChannelSlider, createHighlightJsAdapter, Flex, Grid, GridItem, IconButton, parseColor, ScrollArea, Span, Text, VStack } from "@chakra-ui/react";
import { encodeConfig } from "@/lib/config";
import hljs from "highlight.js/lib/core"
import { useState } from "react";
import { RiPaletteLine, RiLayoutMasonryLine, RiCheckboxMultipleLine } from "react-icons/ri";
import { CheckboxCard } from "@/components/ui/checkbox-card";
import { BsFillPeopleFill } from "react-icons/bs"
import { CgNametag } from "react-icons/cg"
import { HiStatusOnline } from "react-icons/hi"
import { IoLogoTableau } from "react-icons/io5"
import { LuScrollText } from "react-icons/lu"
import { PiFlagBannerFoldFill } from "react-icons/pi"
import { RiPoliceBadgeFill } from "react-icons/ri"
import { Slider } from "./ui/slider";

type ThemeName = "neon" | "minimal" | "animated" | "glass" | "terminal" | "cyberpunk" | "ocean" | "forest" | "sunset" | "retro" | "gradient" | "nature" | "elegant" | "candy" | "midnight" | "frost" | "galaxy" | "aurora"

type SettingsBarProps = {
  theme: ThemeName
  setTheme: (v: ThemeName) => void

  showIcon: boolean
  setShowIcon: (v: boolean) => void
  canShowIcon: boolean

  showMembers: boolean
  setShowMembers: (v: boolean) => void
  canShowMembers: boolean

  showOnline: boolean
  setShowOnline: (v: boolean) => void
  canShowOnline: boolean

  showGuildName: boolean
  setShowGuildName: (v: boolean) => void
  canShowGuildName: boolean

  showDescription: boolean
  setShowDescription: (v: boolean) => void
  canShowDescription: boolean

  showBanner: boolean
  setShowBanner: (v: boolean) => void
  canShowBanner: boolean

  showBadge: boolean
  setShowBadge: (v: boolean) => void
  canShowBadge: boolean

  logoRadius: number
  setLogoRadius: (v: number) => void

  buttonRadius: number
  setButtonRadius: (v: number) => void

  cardRadius: number
  setCardRadius: (v: number) => void

  buttonColor: string
  setButtonColor: (v: string) => void

  themeMode: "dark" | "light"
  setThemeMode: (v: "dark" | "light") => void

  shareCode: string
}

export default function SettingsBar({
  theme,
  setTheme,
  showIcon,
  setShowIcon,
  canShowIcon,
  showMembers,
  setShowMembers,
  canShowMembers,
  showOnline,
  setShowOnline,
  canShowOnline,
  showGuildName,
  canShowGuildName,
  setShowGuildName,
  showDescription,
  setShowDescription,
  canShowDescription,
  showBanner,
  setShowBanner,
  showBadge,
  setShowBadge,
  canShowBanner,
  canShowBadge,
  logoRadius,
  setLogoRadius,
  buttonRadius,
  setButtonRadius,
  cardRadius,
  setCardRadius,
  buttonColor,
  setButtonColor,
  themeMode,
  setThemeMode,
  shareCode,
}: SettingsBarProps) {
  const [activeSection, setActiveSection] = useState<"theme" | "appearance" | "content">("theme")

    const config = encodeConfig({
      invite: shareCode || undefined,
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
    })

    const widgetPath = shareCode
      ? `/w/${shareCode}?c=${encodeURIComponent(config)}`
      : `/w/{inviteCode}?c={config}`

    const iframeCode = `<iframe src="${widgetPath}" width="460" height="220" frameborder="0" allowtransparency="true"></iframe>`

    const file = {
      code: iframeCode,
      language: "html",
      title: "embed.html",
    }

    const themes = [
        { value: "neon", title: "Neon", color: "#a855f7" },
        { value: "minimal", title: "Minimal", color: "#718096" },
        { value: "animated", title: "Animated", color: "#8b5cf6" },
        { value: "glass", title: "Glass", color: "#06b6d4" },
        { value: "terminal", title: "Terminal", color: "#22c55e" },
        { value: "cyberpunk", title: "Cyber", color: "#00f0ff" },
        { value: "ocean", title: "Ocean", color: "#0284c7" },
        { value: "forest", title: "Forest", color: "#16a34a" },
        { value: "sunset", title: "Sunset", color: "#ea580c" },
        { value: "retro", title: "Retro", color: "#f59e0b" },
        { value: "gradient", title: "Gradient", color: "#ec4899" },
        { value: "nature", title: "Nature", color: "#22c55e" },
        { value: "elegant", title: "Elegant", color: "#1f2937" },
        { value: "candy", title: "Candy", color: "#f472b6" },
        { value: "midnight", title: "Midnight", color: "#6366f1" },
        { value: "frost", title: "Frost", color: "#38bdf8" },
        { value: "galaxy", title: "Galaxy", color: "#8b5cf6" },
        { value: "aurora", title: "Aurora", color: "#10b981" },
    ]

    const buttonColors = [
        { value: "#a855f7", name: "Purple" },
        { value: "#3b82f6", name: "Blue" },
        { value: "#22c55e", name: "Green" },
        { value: "#ef4444", name: "Red" },
        { value: "#f59e0b", name: "Orange" },
        { value: "#ec4899", name: "Pink" },
        { value: "#06b6d4", name: "Cyan" },
        { value: "#8b5cf6", name: "Violet" },
        { value: "#000000", name: "Black" },
        { value: "#ffffff", name: "fg" },
    ]

    const sections = [
        { id: "theme", label: "Theme", icon: RiPaletteLine },
        { id: "appearance", label: "Style", icon: RiLayoutMasonryLine },
        { id: "content", label: "Content", icon: RiCheckboxMultipleLine },
    ]

    // Custom slider styles
    const sliderStyles = {
        width: "100%",
        height: "6px",
        background: "rgba(255,255,255,0.2)",
        borderRadius: "9999px",
        appearance: "none" as const,
        cursor: "pointer",
        outline: "none",
    }

    return (
        <Box 
            h="full" 
            w={"full"}
            bg={"bg.subtle"}
            borderRadius="2xl" 
            border="1px solid"
            borderColor="border"
            overflow="hidden"
            position="relative"
            _before={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "200px",
                bgGradient: "linear(to-b, whiteAlpha.50, transparent)",
                pointerEvents: "none",
            }}
        >
            {/* Header */}
            <Box 
                p={5} 
                borderBottom="1px solid" 
                borderColor="border"
                position="relative"
            >
                <Text 
                    fontSize="lg" 
                    fontWeight="semibold" 
                    color="fg"
                    letterSpacing="wide"
                >
                    Settings
                </Text>
            </Box>

            {/* Section Tabs - Modern pill style */}
            <Box px={4} pt={4} position="relative">
                <Grid 
                    templateColumns="repeat(3, 1fr)" 
                    gap={1} 
                    bg="gray.subtle" 
                    p={1} 
                    borderRadius="md"
                >
                    {sections.map((section) => {
                        const Icon = section.icon
                        const isActive = activeSection === section.id
                        return (
                            <Button
                                key={section.id}
                                size="sm"
                                variant="ghost"
                                bg={isActive ? "gray.muted" : "transparent"}
                                color={isActive ? "fg" : "fg/70"}
                                _hover={{ 
                                    bg: isActive ? "gray.muted" : "gray.muted",
                                    color: "fg"
                                }}
                                onClick={() => setActiveSection(section.id as typeof activeSection)}
                                borderRadius="md"
                                transition="all 0.2s"
                            >
                                <Icon style={{ marginRight: "6px", fontSize: "14px" }} />
                                {section.label}
                            </Button>
                        )
                    })}
                </Grid>
            </Box>

            {/* Content */}
            <Box 
                p={4} 
                overflowY="auto" 
                maxH="calc(100vh - 280px)"
                position="relative"
            >
                {/* THEME SECTION */}
                {activeSection === "theme" && (
                <ScrollArea.Root height="20.5rem" variant={"always"} size={"xs"}>
                <ScrollArea.Viewport
                    css={{
                    "--scroll-shadow-size": "4rem",
                    maskImage: "linear-gradient(#000, #000)",
                    "&[data-overflow-y]": {
                        maskImage:
                        "linear-gradient(#000,#000,transparent 0,#000 var(--scroll-shadow-size),#000 calc(100% - var(--scroll-shadow-size)),transparent)",
                        "&[data-at-top]": {
                        maskImage:
                            "linear-gradient(180deg,#000 calc(100% - var(--scroll-shadow-size)),transparent)",
                        },
                        "&[data-at-bottom]": {
                        maskImage:
                            "linear-gradient(0deg,#000 calc(100% - var(--scroll-shadow-size)),transparent)",
                        },
                    },
                    }}
                >
                <ScrollArea.Content paddingEnd="3" textStyle="sm">
                <VStack gap={5} align="stretch">
                        {/* Theme Mode */}
                        <Box>
                            <Text 
                                fontWeight="medium" 
                                fontSize="xs" 
                                mb={3} 
                                color="fg/60"
                                textTransform="uppercase"
                                letterSpacing="wider"
                            >
                                Mode
                            </Text>
                            <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                                <Button
                                    size="sm"
                                    bg={themeMode === "dark" ? "blue.subtle" : "gray.subtle"}
                                    color="fg"
                                    border="1px solid"
                                    borderColor={themeMode === "dark" ? "blue.border" : "gray.muted"}
                                    _hover={{ 
                                        bg: themeMode === "dark" ? "blue.subtle" : "gray.subtle",
                                        borderColor: themeMode === "dark" ? "blue.border" : "gray.emphasized"
                                    }}
                                    onClick={() => setThemeMode("dark")}
                                >
                                    🌙 Dark
                                </Button>
                                <Button
                                    size="sm"
                                    bg={themeMode === "light" ? "blue.subtle" : "gray.subtle"}
                                    color="fg"
                                    border="1px solid"
                                    borderColor={themeMode === "light" ? "blue.border" : "gray.muted"}
                                    _hover={{ 
                                        bg: themeMode === "light" ? "blue.subtle" : "gray.subtle",
                                        borderColor: themeMode === "light" ? "blue.border" : "gray.emphasized"
                                    }}
                                    onClick={() => setThemeMode("light")}
                                >
                                    ☀️ Light
                                </Button>
                            </Grid>
                        </Box>
                        
                        {/* Theme Selection */}
                        <Box>
                            <Text 
                                fontWeight="medium" 
                                fontSize="xs" 
                                mb={3} 
                                color="fg/60"
                                textTransform="uppercase"
                                letterSpacing="wider"
                            >
                                Theme
                            </Text>
                            <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                                {themes.map((item) => (
                                    <Button
                                        key={item.value}
                                        size="sm"
                                        bg={theme === item.value ? "gray.muted" : "gray.subtle"}
                                        color="fg"
                                        border="1px solid"
                                        borderColor={theme === item.value ? item.color : "transparent"}
                                        _hover={{ 
                                            bg: theme === item.value ? "gray.muted" : "gray.subtle",
                                        }}
                                        onClick={() => setTheme(item.value as ThemeName)}
                                        position="relative"
                                        overflow="hidden"
                                    >
                                        {item.title}
                                    </Button>
                                ))}
                            </Grid>
                        </Box>
                    </VStack>
                </ScrollArea.Content>
                </ScrollArea.Viewport>
                </ScrollArea.Root>
                )}

                {/* APPEARANCE SECTION */}
                {activeSection === "appearance" && (
                <ScrollArea.Root height="20.5rem" variant={"hover"} size={"xs"}>
                <ScrollArea.Viewport
                    css={{
                    "--scroll-shadow-size": "4rem",
                    maskImage: "linear-gradient(#000, #000)",
                    "&[data-overflow-y]": {
                        maskImage:
                        "linear-gradient(#000,#000,transparent 0,#000 var(--scroll-shadow-size),#000 calc(100% - var(--scroll-shadow-size)),transparent)",
                        "&[data-at-top]": {
                        maskImage:
                            "linear-gradient(180deg,#000 calc(100% - var(--scroll-shadow-size)),transparent)",
                        },
                        "&[data-at-bottom]": {
                        maskImage:
                            "linear-gradient(0deg,#000 calc(100% - var(--scroll-shadow-size)),transparent)",
                        },
                    },
                    }}
                >
                <ScrollArea.Content paddingEnd="3" textStyle="sm">
                    <VStack gap={5} align="stretch">
                        {/* Border Radius Settings */}
                        <Box>
                            <Text 
                                fontWeight="medium" 
                                fontSize="xs" 
                                mb={3} 
                                color="fg/60"
                                textTransform="uppercase"
                                letterSpacing="wider"
                            >
                                Border Radius
                            </Text>
                            <VStack gap={4} align="stretch">
                                <Box>
                                    <Slider defaultValue={[logoRadius]} label={"Logo"} showValue={true} min={0} max={24}
                                    onChange={(e) => setLogoRadius(Number(e.target.value))} />
                                </Box>
                                <Box>
                                    <Slider defaultValue={[buttonRadius]} label={"Button"} showValue={true} min={0} max={24}
                                    onChange={(e) => setButtonRadius(Number(e.target.value))} />
                                </Box>
                                <Box>
                                    <Slider defaultValue={[cardRadius]} label={"Card"} showValue={true} min={0} max={24}
                                    onChange={(e) => setCardRadius(Number(e.target.value))} />
                                </Box>
                            </VStack>
                        </Box>

                        {/* Button Color */}
                        <Box>
                            <Text 
                                fontWeight="medium" 
                                fontSize="xs" 
                                my={3} 
                                color="fg/60"
                                textTransform="uppercase"
                                letterSpacing="wider"
                            >
                                Button Color
                            </Text>
                            <Grid templateColumns="repeat(5, 1fr)" gap={2} mb={3}>
                                {buttonColors.map((color) => (
                                    <Box
                                        key={color.value}
                                        as="button"
                                        onClick={() => setButtonColor(color.value)}
                                        h="10"
                                        borderRadius="md"
                                        bg={color.value}
                                        borderWidth="2px"
                                        borderColor={buttonColor === color.value ? "gray.fg" : "gray.emphasized"}
                                        transition="all 0.2s"
                                        _hover={{ 
                                            transform: "scale(1.1)",
                                            boxShadow: `0 0 12px ${color.value}50`
                                        }}
                                        title={color.name}
                                    />
                                ))}
                            </Grid>
                            <Box position="relative">
                                <ColorPicker.Root defaultValue={parseColor(buttonColor)} variant={"outline"} onChange={(e) => setButtonColor(e.target.value)}>
                                <ColorPicker.HiddenInput />
                                <ColorPicker.Label />
                                <ColorPicker.Control>
                                    <ColorPicker.Trigger w={"full"} data-fit-content/>
                                </ColorPicker.Control>
                                <ColorPicker.Positioner>
                                    <ColorPicker.Content p={3}>
                                        <ColorPicker.Area />
                                        <ColorPickerChannelSlider channel="hue" />
                                    </ColorPicker.Content>
                                </ColorPicker.Positioner>
                                </ColorPicker.Root>
                                <style>{`
                                    .colorPicker__swatch.css-lkq982 {
                                        width: 100%;
                                        height: 35px;
                                        border-radius: 6px;
                                    }
                                `}</style>
                            </Box>
                        </Box>
                    </VStack>
                </ScrollArea.Content>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar />
                </ScrollArea.Root>
                )}

                {/* CONTENT SECTION */}
                {activeSection === "content" && (
                <ScrollArea.Root height="20.5rem" variant={"always"} size={"xs"}>
                <ScrollArea.Viewport
                    css={{
                    "--scroll-shadow-size": "4rem",
                    maskImage: "linear-gradient(#000, #000)",
                    "&[data-overflow-y]": {
                        maskImage:
                        "linear-gradient(#000,#000,transparent 0,#000 var(--scroll-shadow-size),#000 calc(100% - var(--scroll-shadow-size)),transparent)",
                        "&[data-at-top]": {
                        maskImage:
                            "linear-gradient(180deg,#000 calc(100% - var(--scroll-shadow-size)),transparent)",
                        },
                        "&[data-at-bottom]": {
                        maskImage:
                            "linear-gradient(0deg,#000 calc(100% - var(--scroll-shadow-size)),transparent)",
                        },
                    },
                    }}
                >
                <ScrollArea.Content paddingEnd="3" textStyle="sm">
                <VStack gap={5} align="stretch">
                    <Box>
                        <Text 
                            fontWeight="medium" 
                            fontSize="xs" 
                            mb={3} 
                            color="fg/60"
                            textTransform="uppercase"
                            letterSpacing="wider"
                        >
                            Widget Content
                        </Text>
                        <Grid gap={2} templateColumns="repeat(2, 1fr)">
                            <GridItem>
                                <CheckboxCard
                                    checked={showIcon}
                                    onCheckedChange={(checked) => canShowIcon && setShowIcon(checked)}
                                    label="Icon"
                                    icon={IoLogoTableau}
                                    description="Displays the server's avatar or icon in the widget."
                                    disabled={!canShowIcon}
                                />
                            </GridItem>
                            <GridItem>
                                <CheckboxCard
                                    checked={showMembers}
                                    onCheckedChange={(checked) => canShowMembers && setShowMembers(checked)}
                                    label="Members"
                                    icon={BsFillPeopleFill}
                                    description="Shows the total number of members in the server."
                                    disabled={!canShowMembers}
                                />
                            </GridItem>
                            <GridItem>
                                <CheckboxCard
                                    checked={showOnline}
                                    onCheckedChange={(checked) => canShowOnline && setShowOnline(checked)}
                                    label="Online"
                                    icon={HiStatusOnline}
                                    description="Displays how many members are currently online."
                                    disabled={!canShowOnline}
                                />
                            </GridItem>
                            <GridItem>
                                <CheckboxCard
                                    checked={showGuildName}
                                    onCheckedChange={(checked) => canShowGuildName && setShowGuildName(checked)}
                                    label="Name"
                                    icon={CgNametag}
                                    description="Shows the server name at the top of the widget."
                                    disabled={!canShowGuildName}
                                />
                            </GridItem>
                            <GridItem>
                                <CheckboxCard
                                    checked={showDescription}
                                    onCheckedChange={(checked) => canShowDescription && setShowDescription(checked)}
                                    label="Description"
                                    icon={LuScrollText}
                                    description="Displays the server description or tagline."
                                    disabled={!canShowDescription}
                                />
                            </GridItem>
                            <GridItem>
                                <CheckboxCard
                                    checked={showBanner}
                                    onCheckedChange={(checked) => canShowBanner && setShowBanner(checked)}
                                    label="Banner"
                                    icon={PiFlagBannerFoldFill}
                                    description="Shows the server banner or cover image in the widget."
                                    disabled={!canShowBanner}
                                />
                            </GridItem>
                            <GridItem colSpan={2}>
                                <CheckboxCard
                                    checked={showBadge}
                                    onCheckedChange={(checked) => canShowBadge && setShowBadge(checked)}
                                    label="Badge"
                                    icon={RiPoliceBadgeFill}
                                    description="Displays a small badge or tag (e.g. NEW, OPEN, VERIFIED)."
                                    disabled={!canShowBadge}
                                />
                            </GridItem>
                        </Grid>
                    </Box>
                    </VStack>
                </ScrollArea.Content>
                </ScrollArea.Viewport>
                </ScrollArea.Root>
                )}
            </Box>

            {/* Embed Code Section */}
            <Accordion.Root collapsible p={4}>
            <Accordion.Item value="embed-code" disabled={!shareCode} style={{borderBottomWidth: 0}}>
                <Accordion.ItemTrigger>
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} flex="1">
                    <Text fontWeight="medium" fontSize="xs" color="whiteAlpha.600" textTransform="uppercase" letterSpacing="wider">
                        Embed Code
                    </Text>
                    <Accordion.ItemIndicator />
                    </Box>
                </Accordion.ItemTrigger>
                <Accordion.ItemContent mt={3}>
                <Accordion.ItemBody>
                    {shareCode && (
                        <Box 
                            bg="bg.subtle" 
                            p={3} 
                            borderRadius="md"
                            border="1px solid"
                            borderColor="bg.muted"
                        >
                            <Text 
                                fontSize="xs" 
                                fontFamily="mono" 
                                color="fg/70"
                                whiteSpace="pre-wrap"
                                wordBreak="break-all"
                            >
                                {iframeCode}
                            </Text>
                            <Text fontSize="xs" color="fg/30" mt={2}>
                                URL: {widgetPath}
                            </Text>
                        </Box>
                    )}
                </Accordion.ItemBody>
                </Accordion.ItemContent>
                </Accordion.Item>
            </Accordion.Root>
        </Box>
    )
}
