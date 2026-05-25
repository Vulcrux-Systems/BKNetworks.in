'use client';

import CurvedLoop from '@/components/ui/curved-loop';

export default function BrandLoop() {
  return (
    <section className="relative py-16 overflow-hidden">
      <CurvedLoop
        marqueeText="BK NETWORKS ✦ BK NETWORKS ✦ BK NETWORKS ✦"
        speed={2}
        curveAmount={280}
        direction="left"
        interactive={true}
        className="fill-[#60A5FA] font-black"
      />
    </section>
  );
}
