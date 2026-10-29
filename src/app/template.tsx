/** Page entrance — re-mounts (and so replays) on every navigation. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
