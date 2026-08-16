export function SpicePrint() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.09]"
      style={{
        backgroundImage: 'url(/menu-print.jpg)',
        backgroundSize: '28rem',
        backgroundRepeat: 'repeat',
      }}
      aria-hidden="true"
    />
  );
}
