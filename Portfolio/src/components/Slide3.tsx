import React, { useState } from "react";
import { ScrollStackDeck } from "@/components/ScrollStackDeck";
import { BioTraceShowcaseModal } from "@/components/BioTraceShowcaseModal";
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
      <BioTraceShowcaseModal
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
