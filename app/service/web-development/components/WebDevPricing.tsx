export default function WebDevPricing() {
  return (
    <section style={{
      padding: '32px 0',
    }}>
      <div className="w-layout-blockcontainer rt-container-main w-container">
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '64px',
          flexWrap: 'wrap',
        }}>

          {/* Stat 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '40px', fontWeight: 800, color: '#1833fe', lineHeight: 1 }}>350+</span>
            <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 500, letterSpacing: '0.01em' }}>Projects delivered</span>
          </div>

          {/* Divider */}
          <div style={{ width: '1px', height: '48px', background: 'rgba(0,0,0,0.08)' }} />

          {/* Stat 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '40px', fontWeight: 800, color: '#6366f1', lineHeight: 1 }}>7+</span>
            <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 500, letterSpacing: '0.01em' }}>Years experience</span>
          </div>

          {/* Divider */}
          <div style={{ width: '1px', height: '48px', background: 'rgba(0,0,0,0.08)' }} />

          {/* Stat 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '40px', fontWeight: 800, color: '#0ea5e9', lineHeight: 1 }}>100%</span>
            <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 500, letterSpacing: '0.01em' }}>Support after launch</span>
          </div>

        </div>
      </div>
    </section>
  );
}
