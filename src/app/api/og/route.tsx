import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Default values
    const hasTitle = searchParams.has('title')
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'ShtefAI blog — Where Machines Learn and Humans Discover'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(to bottom right, #1e1e2f, #3a0ca3)', // Deep Ultraviolet to violet gradient
            position: 'relative',
          }}
        >
          {/* Subtle background decoration */}
          <div
            style={{
              position: 'absolute',
              top: '-20%',
              left: '-10%',
              width: '50%',
              height: '50%',
              background: 'radial-gradient(circle, rgba(204,255,0,0.15) 0%, rgba(0,0,0,0) 70%)', // Electric Lime glow
              borderRadius: '50%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-20%',
              right: '-10%',
              width: '60%',
              height: '60%',
              background: 'radial-gradient(circle, rgba(147,51,234,0.2) 0%, rgba(0,0,0,0) 70%)',
              borderRadius: '50%',
            }}
          />

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '40px',
              padding: '10px 24px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <span style={{ fontSize: '32px', marginRight: '16px' }}>⚡</span>
            <span
              style={{
                fontSize: '32px',
                fontWeight: 700,
                color: '#ccff00', // Electric lime
                letterSpacing: '-0.02em',
              }}
            >
              ShtefAI blog
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 80px',
              textAlign: 'center',
            }}
          >
            <h1
              style={{
                fontSize: title && title.length > 50 ? '60px' : '72px',
                fontFamily: 'sans-serif',
                fontWeight: 800,
                color: 'white',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </h1>
          </div>
          
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              padding: '0 80px',
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '24px',
              fontFamily: 'sans-serif',
            }}
          >
            <span>shtefai.com</span>
            <span>Written by Shtef</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.error(e)
    return new Response('Failed to generate image', { status: 500 })
  }
}
