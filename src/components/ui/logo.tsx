import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn('w-10 h-10 drop-shadow-md', className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="silver-metal"
          x1="0"
          y1="0"
          x2="100"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#c0c0c0" />
          <stop offset="100%" stopColor="#808080" />
        </linearGradient>
      </defs>

      {/* Hexagon Outline */}
      <polygon
        points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
        stroke="url(#silver-metal)"
        strokeWidth="6"
        strokeLinejoin="round"
        fill="none"
      />

      {/* 3 Vertical Increasing Bars */}
      <rect
        x="30"
        y="60"
        width="8"
        height="20"
        fill="url(#silver-metal)"
        rx="2"
      />
      <rect
        x="46"
        y="45"
        width="8"
        height="35"
        fill="url(#silver-metal)"
        rx="2"
      />
      <rect
        x="62"
        y="30"
        width="8"
        height="50"
        fill="url(#silver-metal)"
        rx="2"
      />

      {/* Ascending Diagonal Slash */}
      <path
        d="M20 80 L80 20"
        stroke="url(#silver-metal)"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  )
}
