// src/data/repositories/JourneyRepository.ts

import { JourneyMilestone } from "@/lib/types";
import { journeyMock } from "../mocks/journey.mock";

export interface IJourneyRepository {
  getAll(): JourneyMilestone[];
  getByType(type: JourneyMilestone["type"]): JourneyMilestone[];
  getHighlighted(): JourneyMilestone[];
  getCurrent(): JourneyMilestone | undefined;
}

export class JourneyRepository implements IJourneyRepository {
  private milestones: JourneyMilestone[];

  constructor(milestones: JourneyMilestone[] = journeyMock) {
    // Ordena por data (mais recente primeiro)
    this.milestones = [...milestones].sort(
      (a, b) => b.startDate.getTime() - a.startDate.getTime(),
    );
  }

  getAll(): JourneyMilestone[] {
    return this.milestones;
  }

  getByType(type: JourneyMilestone["type"]): JourneyMilestone[] {
    return this.milestones.filter((m) => m.type === type);
  }

  getHighlighted(): JourneyMilestone[] {
    return this.milestones.filter((m) => m.highlight);
  }

  getCurrent(): JourneyMilestone | undefined {
    return this.milestones.find((m) => m.isCurrent);
  }
}

export const journeyRepository = new JourneyRepository();
