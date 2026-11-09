import React, { useState } from "react";
import { ScrollStackDeck } from "@/components/ScrollStackDeck";
import { BioTraceShowcaseModal } from "@/components/BioTraceShowcaseModal";
import { CircleShowcaseModal } from "@/components/CircleShowcaseModal";
import { KechiShowcaseModal } from "@/components/KechiShowcaseModal";
import type { ProjectShowcaseData } from "@/data/projectsData";

interface Slide3Props {
  onOpenShowcase?: (project: ProjectShowcaseData) => void;
}

export function Slide3({ onOpenShowcase }: Slide3Props) {
  const [selectedProject, setSelectedProject] =
    useState<ProjectShowcaseData | null>(null);

  const handleSelect = (project: ProjectShowcaseData) => {
    setSelectedProject(project);
    if (onOpenShowcase) onOpenShowcase(project);
  };

  return (
    <>
      <ScrollStackDeck onSelectProject={handleSelect} />

      {/* BioTrace Dedicated Showcase Modal */}
      <BioTraceShowcaseModal
        isOpen={selectedProject?.id === "biotrace"}
        onClose={() => setSelectedProject(null)}
      />

      {/* Circle Dedicated Showcase Modal */}
      <CircleShowcaseModal
        isOpen={selectedProject?.id === "circle"}
        onClose={() => setSelectedProject(null)}
      />

      {/* Kechi Dedicated Showcase Modal */}
      <KechiShowcaseModal
        isOpen={selectedProject?.id === "kechi"}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
