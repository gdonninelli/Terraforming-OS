export enum ResourceType {
  MegaCredits = 'MegaCredits',
  Steel = 'Steel',
  Titanium = 'Titanium',
  Plants = 'Plants',
  Energy = 'Energy',
  Heat = 'Heat',
}

export interface PlayerResources {
  [ResourceType.MegaCredits]: number;
  [ResourceType.Steel]: number;
  [ResourceType.Titanium]: number;
  [ResourceType.Plants]: number;
  [ResourceType.Energy]: number;
  [ResourceType.Heat]: number;
}

export interface Production {
  [ResourceType.MegaCredits]: number;
  [ResourceType.Steel]: number;
  [ResourceType.Titanium]: number;
  [ResourceType.Plants]: number;
  [ResourceType.Energy]: number;
  [ResourceType.Heat]: number;
}

export interface GameState {
  tr: number;
  generation: number;
  resources: PlayerResources;
  production: Production;
  tags: {
    science: number;
    building: number;
    space: number;
    microbe: number;
    plant: number;
    animal: number;
    jovian: number;
    earth: number;
    city: number;
    event: number;
  };
  globalParameters: {
    temperature: number; // -30 to 8
    oxygen: number; // 0 to 14
    oceans: number; // 0 to 9
  };
  milestones: {
    terraformer: boolean;
    mayor: boolean;
    gardener: boolean;
    builder: boolean;
    planner: boolean;
  };
}

export type View = 'dashboard' | 'setup' | 'economy' | 'map' | 'milestones' | 'ai-analysis';