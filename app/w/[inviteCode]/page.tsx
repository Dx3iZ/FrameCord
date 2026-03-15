import WidgetPreview from "@/components/WidgetPreview"
import { fetchInvite } from "@/lib/discord"
import type { AppConfig } from "@/lib/config"

type PageProps = {
  params: Promise<{
    inviteCode: string
  }>
  searchParams: Promise<{
    c?: string
  }>
}

function decodeConfigFromQuery(str: string | undefined): AppConfig | null {
  if (!str) return null
  try {
    const json = Buffer.from(str, "base64").toString("utf8")
    return JSON.parse(json) as AppConfig
  } catch {
    return null
  }
}

export default async function WidgetPage({ params, searchParams }: PageProps) {
  const [{ inviteCode }, search] = await Promise.all([params, searchParams])

  const config = decodeConfigFromQuery(search.c)
  const effectiveInvite = config?.invite || inviteCode

  const data = await fetchInvite(effectiveInvite).catch(() => null)

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        backgroundColor: "transparent",
      }}
    >
      <WidgetPreview
        data={data}
        theme={config?.theme || "neon"}
        showIcon={config?.showIcon ?? true}
        showMembers={config?.showMembers ?? true}
        showOnline={config?.showOnline ?? true}
        showGuildName={config?.showGuildName ?? true}
        showDescription={config?.showDescription ?? true}
        showBanner={config?.showBanner ?? true}
        showBadge={config?.showBadge ?? true}
        logoRadius={config?.logoRadius ?? 8}
        buttonRadius={config?.buttonRadius ?? 6}
        cardRadius={config?.cardRadius ?? 12}
        buttonColor={config?.buttonColor}
        themeMode={config?.themeMode ?? "dark"}
      />
    </div>
  )
}
