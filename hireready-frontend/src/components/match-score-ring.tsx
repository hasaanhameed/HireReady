import { cn } from '@/lib/utils';

interface MatchScoreRingProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function MatchScoreRing({ score, size = 'md', showLabel = true }: MatchScoreRingProps) {
  const sizeConfig = {
    sm: { width: 48, stroke: 4, fontSize: 'text-xs' },
    md: { width: 80, stroke: 6, fontSize: 'text-lg' },
    lg: { width: 120, stroke: 8, fontSize: 'text-3xl' },
  };

  const config = sizeConfig[size];
  const radius = (config.width - config.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={config.width}
        height={config.width}
        className="-rotate-90 transform"
      >
        {/* Background circle */}
        <circle
          cx={config.width / 2}
          cy={config.width / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-muted/20"
          strokeWidth={config.stroke}
        />
        {/* Progress circle */}
        <circle
          cx={config.width / 2}
          cy={config.width / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-sienna transition-all duration-500"
          strokeWidth={config.stroke}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-bold text-foreground", config.fontSize)}>
            {score}%
          </span>
          {size === 'lg' && (
            <span className="text-xs text-muted-foreground">Match</span>
          )}
        </div>
      )}
    </div>
  );
}
