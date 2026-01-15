'use client';

export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #0a0a0a 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>

      {/* Main heading with neon gradient */}
      <h1 style={{
        fontSize: '80px',
        fontWeight: '900',
        background: 'linear-gradient(90deg, #00f5ff 0%, #a855f7 50%, #ff006e 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textAlign: 'center',
        marginBottom: '30px',
        textShadow: '0 0 40px rgba(0, 245, 255, 0.5)',
        animation: 'pulse 2s ease-in-out infinite'
      }}>
        UI VISIBILITY TEST
      </h1>

      {/* Subtitle */}
      <p style={{
        fontSize: '32px',
        color: '#00f5ff',
        textAlign: 'center',
        marginBottom: '40px',
        textShadow: '0 0 20px rgba(0, 245, 255, 0.8)'
      }}>
        Evolution of Todo - Neon Cyberpunk Edition
      </p>

      {/* Status indicator */}
      <div style={{
        background: 'rgba(0, 245, 255, 0.1)',
        border: '2px solid #00f5ff',
        borderRadius: '15px',
        padding: '30px 60px',
        marginBottom: '40px',
        boxShadow: '0 0 30px rgba(0, 245, 255, 0.3)'
      }}>
        <p style={{
          fontSize: '24px',
          color: '#ffffff',
          margin: '0',
          textAlign: 'center'
        }}>
          ✅ If you can see this styled text with neon colors,<br/>
          the UI is working correctly!
        </p>
      </div>

      {/* Buttons */}
      <div style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <a href="/sign-in" style={{ textDecoration: 'none' }}>
          <button style={{
            padding: '15px 40px',
            fontSize: '20px',
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #00f5ff, #a855f7)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 0 20px rgba(0, 245, 255, 0.5)',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Sign In
          </button>
        </a>

        <a href="/sign-up" style={{ textDecoration: 'none' }}>
          <button style={{
            padding: '15px 40px',
            fontSize: '20px',
            fontWeight: 'bold',
            background: 'transparent',
            color: '#ff006e',
            border: '2px solid #ff006e',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 0 20px rgba(255, 0, 110, 0.5)',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Get Started
          </button>
        </a>
      </div>

      {/* Feature cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        marginTop: '60px',
        width: '100%'
      }}>
        {[
          { icon: '🔒', title: 'Secure', color: '#00f5ff' },
          { icon: '💾', title: 'Offline-first', color: '#a855f7' },
          { icon: '⚡', title: 'Fast', color: '#ff006e' }
        ].map((feature, index) => (
          <div key={index} style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: `2px solid ${feature.color}`,
            borderRadius: '20px',
            padding: '30px',
            textAlign: 'center',
            boxShadow: `0 0 30px ${feature.color}40`
          }}>
            <div style={{ fontSize: '60px', marginBottom: '15px' }}>
              {feature.icon}
            </div>
            <h3 style={{
              fontSize: '24px',
              color: feature.color,
              marginBottom: '10px',
              fontWeight: 'bold'
            }}>
              {feature.title}
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#cccccc',
              margin: '0'
            }}>
              Premium feature
            </p>
          </div>
        ))}
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}
