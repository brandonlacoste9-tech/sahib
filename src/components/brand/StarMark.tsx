type Props = {
  className?: string;
  title?: string;
};

/** Eight-point star — Mughal / Islamic geometry, line only. */
export function StarMark({ className = 'h-3 w-3', title }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      className={className}
    >
      {title ? <title>{title}</title> : null}
      <rect
        x="6.2"
        y="6.2"
        width="11.6"
        height="11.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <rect
        x="6.2"
        y="6.2"
        width="11.6"
        height="11.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        transform="rotate(45 12 12)"
      />
    </svg>
  );
}
