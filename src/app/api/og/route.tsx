import { ImageResponse } from 'next/og'

export const runtime = 'edge'

const DEFAULT_TITLE = 'ShtefAI blog - Where Machines Learn and Humans Discover'

const presets = [
  {
    bg: 'linear-gradient(135deg, #081120 0%, #0f2f46 52%, #0f766e 100%)',
    panel: 'rgba(6, 12, 24, 0.78)',
    border: 'rgba(148, 163, 184, 0.24)',
    accent: '#7dd3fc',
    accentGlow: 'rgba(125, 211, 252, 0.28)',
    orbA: 'rgba(125, 211, 252, 0.18)',
    orbB: 'rgba(45, 212, 191, 0.24)'
  },
  {
    bg: 'linear-gradient(135deg, #140f1e 0%, #36214f 54%, #b45309 100%)',
    panel: 'rgba(16, 10, 26, 0.8)',
    border: 'rgba(251, 191, 36, 0.24)',
    accent: '#fbbf24',
    accentGlow: 'rgba(251, 191, 36, 0.3)',
    orbA: 'rgba(249, 115, 22, 0.18)',
    orbB: 'rgba(251, 191, 36, 0.24)'
  },
  {
    bg: 'linear-gradient(135deg, #0d1321 0%, #1f2937 52%, #9f1239 100%)',
    panel: 'rgba(10, 15, 28, 0.8)',
    border: 'rgba(251, 113, 133, 0.24)',
    accent: '#fb7185',
    accentGlow: 'rgba(251, 113, 133, 0.28)',
    orbA: 'rgba(244, 114, 182, 0.18)',
    orbB: 'rgba(251, 113, 133, 0.24)'
  },
  {
    bg: 'linear-gradient(135deg, #111827 0%, #1e3a8a 50%, #0ea5e9 100%)',
    panel: 'rgba(7, 11, 24, 0.8)',
    border: 'rgba(96, 165, 250, 0.24)',
    accent: '#93c5fd',
    accentGlow: 'rgba(96, 165, 250, 0.3)',
    orbA: 'rgba(96, 165, 250, 0.2)',
    orbB: 'rgba(14, 165, 233, 0.24)'
  }
]

const hashString = (value: string) => {
  let hash = 0

  for (let i = 0; i < value.length; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash)
  }

  return Math.abs(hash)
}

const getTitleFontSize = (title: string) => {
  if (title.length > 92) return 40
  if (title.length > 76) return 46
  if (title.length > 60) return 52

  return 60
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const rawTitle = searchParams.get('title')?.trim()
    const title = rawTitle ? rawTitle.slice(0, 110) : DEFAULT_TITLE
    const presetIndex = hashString(title) % presets.length
    const currentPreset = presets[presetIndex]
    const titleFontSize = getTitleFontSize(title)

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: currentPreset.bg,
            position: 'relative',
            overflow: 'hidden',
            padding: '44px',
            color: '#f8fafc',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-120px',
              right: '-100px',
              width: '420px',
              height: '420px',
              background: `radial-gradient(circle, ${currentPreset.orbA} 0%, rgba(0,0,0,0) 72%)`,
              borderRadius: '50%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-180px',
              left: '-80px',
              width: '480px',
              height: '480px',
              background: `radial-gradient(circle, ${currentPreset.orbB} 0%, rgba(0,0,0,0) 70%)`,
              borderRadius: '50%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: '26px',
              borderRadius: '30px',
              border: `1px solid ${currentPreset.border}`,
            }}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              width: '100%',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '16px 22px',
                  background: 'rgba(6, 12, 24, 0.46)',
                  borderRadius: '999px',
                  border: `1px solid ${currentPreset.border}`,
                }}
              >
                <div
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '4px',
                    background: currentPreset.accent,
                    boxShadow: `0 0 26px ${currentPreset.accentGlow}`,
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    fontSize: '26px',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                  }}
                >
                  ShtefAI blog
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 18px',
                  background: 'rgba(6, 12, 24, 0.52)',
                  borderRadius: '999px',
                  border: `1px solid ${currentPreset.border}`,
                  color: currentPreset.accent,
                  fontSize: '20px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                }}
              >
                AI News
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '26px',
                width: '100%',
                marginTop: '24px',
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  width: '10px',
                  alignSelf: 'stretch',
                  borderRadius: '999px',
                  background: currentPreset.accent,
                  boxShadow: `0 0 36px ${currentPreset.accentGlow}`,
                }}
              />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  maxWidth: '880px',
                  minHeight: '332px',
                  padding: '38px 42px',
                  background: currentPreset.panel,
                  borderRadius: '30px',
                  border: `1px solid ${currentPreset.border}`,
                  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.32)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    color: currentPreset.accent,
                    fontSize: '18px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.16em',
                  }}
                >
                  Featured Story
                </div>
                <div
                  style={{
                    display: 'flex',
                    fontSize: `${titleFontSize}px`,
                    fontWeight: 800,
                    lineHeight: 1.06,
                    letterSpacing: '-0.045em',
                    maxWidth: '780px',
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    display: 'flex',
                    fontSize: '24px',
                    lineHeight: 1.35,
                    color: 'rgba(226, 232, 240, 0.8)',
                    maxWidth: '720px',
                  }}
                >
                  Daily AI reporting with cleaner hierarchy, stronger contrast, and headline-safe framing.
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: 'rgba(226, 232, 240, 0.76)',
                fontSize: '22px',
                padding: '0 2px',
              }}
            >
              <div style={{ display: 'flex' }}>shtefai.com</div>
              <div style={{ display: 'flex' }}>Written by Shtef</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    console.error(error)

    return new Response('Failed to generate image', { status: 500 })
  }
}
