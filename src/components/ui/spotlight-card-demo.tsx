import React from 'react';
import { GlowCard } from "@/components/ui/spotlight-card";

export function Default() {
  return (
    <div className="w-screen h-screen flex flex-row items-center justify-center gap-10 custom-cursor bg-[#050509]">
      <GlowCard glowColor="blue">
        <h3 className="text-white text-xl font-bold">Card 1</h3>
      </GlowCard>
      <GlowCard glowColor="purple">
        <h3 className="text-white text-xl font-bold">Card 2</h3>
      </GlowCard>
      <GlowCard glowColor="green">
        <h3 className="text-white text-xl font-bold">Card 3</h3>
      </GlowCard>
    </div>
  );
}

export default Default;
