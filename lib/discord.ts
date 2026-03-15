export async function fetchInvite(invite: string) {
  if (!invite || invite.trim() === "") {
    throw new Error("Invite code is required")
  }

  const normalized = invite.trim().replace(/^https?:\/\//, "")
  const lastSegment = normalized.split("/").pop() ?? ""
  const safeInvite = lastSegment.split(/[?#]/)[0].trim()

  if (!safeInvite) {
    throw new Error("Invalid invite")
  }

  const res = await fetch(
    `https://discord.com/api/v10/invites/${encodeURIComponent(safeInvite)}?with_counts=true`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    const json = await res.json().catch(() => null)
    const message = json?.message || "Invalid invite"
    throw new Error(message)
  }

  return res.json()
}