const GLOWS = [
  { color: '#8B5CF6', left: '10%',  top: '15%', size: 500 },
  { color: '#5EE7FF', left: '75%',  top: '40%', size: 420 },
  { color: '#FF4FD8', left: '45%',  top: '75%', size: 460 },
]

export default function BackgroundGlow() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {GLOWS.map((g, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: g.left,
            top: g.top,
            width: g.size,
            height: g.size,
            borderRadius: '50%',
            background: g.color,
            filter: `blur(80px)`,
            opacity: 0.10,
            marginLeft: -g.size / 2,
            marginTop: -g.size / 2,
            pointerEvents: 'none',
          }}
        />
      ))}
    </div>
  )
}
