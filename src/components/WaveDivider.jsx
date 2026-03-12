/**
 * WaveDivider – decorative SVG wave between sections
 * @param {string} fill  – color of the wave (matches the NEXT section's bg)
 * @param {string} bg    – background color of the CURRENT section (default transparent)
 * @param {'top'|'bottom'} position – where to place it (default 'bottom')
 * @param {boolean} flip – flip horizontally for variety
 */
export default function WaveDivider({
  fill = '#fff7ed',
  bg = 'transparent',
  position = 'bottom',
  flip = false,
  height = 80,
}) {
  const style = {
    position: 'absolute',
    [position]: -1,
    left: 0,
    width: '100%',
    overflow: 'hidden',
    lineHeight: 0,
    ...(position === 'top' ? { transform: 'rotate(180deg)' } : {}),
  }

  return (
    <div style={style} aria-hidden="true">
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{
          display: 'block',
          width: '100%',
          height,
          background: bg,
          transform: flip ? 'scaleX(-1)' : undefined,
        }}
      >
        <path
          d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40 L1440,80 L0,80 Z"
          fill={fill}
        />
      </svg>
    </div>
  )
}
