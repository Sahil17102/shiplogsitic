export function SunriseBackdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-[#fff8ed]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#faf8f3_0%,#fff8eb_42%,#ffedcf_73%,#ffd7aa_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_67%_45%_at_50%_103%,rgba(119,88,255,.62)_0%,rgba(168,82,244,.43)_22%,rgba(224,95,216,.22)_43%,rgba(255,143,182,.08)_62%,transparent_78%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_13%,rgba(255,255,255,.5),transparent_38%),radial-gradient(circle_at_85%_18%,rgba(255,255,255,.38),transparent_42%)]" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(180deg,transparent_0%,rgba(137,83,255,.08)_72%,rgba(105,73,255,.24)_100%)]" />
    </div>
  );
}
