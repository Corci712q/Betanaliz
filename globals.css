'use client'
import React from 'react'

// Badge
type BadgeVariant = 'accent' | 'success' | 'warning' | 'danger' | 'neutral'
export function Badge({ children, variant = 'neutral' }: { children: React.ReactNode; variant?: BadgeVariant }) {
  const styles: Record<BadgeVariant, React.CSSProperties> = {
    accent:  { background: 'var(--accent-bg)',   color: 'var(--accent-text)',  border: '1px solid var(--accent-border)' },
    success: { background: 'var(--success-bg)',  color: 'var(--success-text)', border: '1px solid #bbf7d0' },
    warning: { background: 'var(--warning-bg)',  color: 'var(--warning-text)', border: '1px solid #fde68a' },
    danger:  { background: 'var(--danger-bg)',   color: 'var(--danger-text)',  border: '1px solid #fecaca' },
    neutral: { background: 'var(--surface-2)',   color: 'var(--text-secondary)', border: '1px solid var(--border)' },
  }
  return (
    <span style={{
      display: 'inline-block', padding: '2px 8px', borderRadius: 6,
      fontSize: 12, fontWeight: 500, ...styles[variant]
    }}>{children}</span>
  )
}

// Button
type BtnVariant = 'primary' | 'secondary' | 'ghost'
export function Button({
  children, onClick, variant = 'secondary', disabled, fullWidth, size = 'md'
}: {
  children: React.ReactNode
  onClick?: () => void
  variant?: BtnVariant
  disabled?: boolean
  fullWidth?: boolean
  size?: 'sm' | 'md'
}) {
  const base: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    borderRadius: 'var(--radius)', fontWeight: 500, cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1, border: 'none', transition: 'all .15s',
    width: fullWidth ? '100%' : undefined,
    padding: size === 'sm' ? '5px 12px' : '9px 18px',
    fontSize: size === 'sm' ? 13 : 14,
  }
  const variants: Record<BtnVariant, React.CSSProperties> = {
    primary:   { background: 'var(--accent)', color: '#fff' },
    secondary: { background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' },
    ghost:     { background: 'transparent', color: 'var(--text-secondary)' },
  }
  return (
    <button onClick={onClick} disabled={disabled} style={{ ...base, ...variants[variant] }}>
      {children}
    </button>
  )
}

// Card
export function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 12, padding: '1.125rem', ...style
    }}>{children}</div>
  )
}

// Section title
export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>
      {children}
    </div>
  )
}

// Stat row
export function StatRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
      <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
      <span style={{ fontWeight: 500 }}>{value}</span>
    </div>
  )
}

// Form group
export function FormGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '.875rem' }}>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '.04em' }}>
        {label}
      </label>
      {children}
    </div>
  )
}

// Info box
export function InfoBox({ children, variant = 'accent' }: { children: React.ReactNode; variant?: 'accent' | 'warning' | 'danger' }) {
  const styles = {
    accent:  { background: 'var(--accent-bg)',  color: 'var(--accent-text)',  border: '1px solid var(--accent-border)' },
    warning: { background: 'var(--warning-bg)', color: 'var(--warning-text)', border: '1px solid #fde68a' },
    danger:  { background: 'var(--danger-bg)',  color: 'var(--danger-text)',  border: '1px solid #fecaca' },
  }
  return (
    <div style={{ borderRadius: 'var(--radius)', padding: '9px 12px', fontSize: 13, marginBottom: '.875rem', ...styles[variant] }}>
      {children}
    </div>
  )
}

// Loading spinner
export function Spinner() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: 13, padding: '.75rem 0' }}>
      <div style={{
        width: 14, height: 14, border: '2px solid var(--border)', borderTopColor: 'var(--accent)',
        borderRadius: '50%', animation: 'spin .8s linear infinite', flexShrink: 0
      }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      Web araştırması yapılıyor, Poisson analizi hesaplanıyor...
    </div>
  )
}
