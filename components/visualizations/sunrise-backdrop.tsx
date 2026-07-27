export function SunriseBackdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-[#fff5e5]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#fffaf1_0%,#fff4df_36%,#ffe5bd_72%,#ffce8d_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_64%_58%_at_50%_104%,rgba(142,75,255,.72)_0%,rgba(184,91,248,.5)_19%,rgba(229,105,219,.28)_37%,rgba(255,143,182,.12)_55%,transparent_74%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,.44),transparent_37%),radial-gradient(circle_at_84%_22%,rgba(255,248,237,.58),transparent_41%)]" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent_0%,rgba(171,94,255,.09)_78%,rgba(105,73,255,.28)_100%)]" />
    </div>
  );
}
