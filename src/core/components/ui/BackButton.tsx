import { useNavigate } from 'react-router'

interface BackButtonProps {
  to?: string
  label?: string
}

export function BackButton({ to, label }: BackButtonProps) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => (to ? navigate(to) : navigate(-1))}
      className="group inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground/50 hover:text-foreground transition-colors cursor-pointer px-1 py-1 -ml-1"
    >
      <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
      </svg>
      {label && <span>{label}</span>}
    </button>
  )
}
