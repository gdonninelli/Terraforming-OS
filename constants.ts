import { ResourceType } from './types';
import { Pickaxe, Shield, Sprout, Zap, Flame, Coins } from 'lucide-react';

export const RESOURCE_ICONS: Record<ResourceType, any> = {
  [ResourceType.MegaCredits]: Coins,
  [ResourceType.Steel]: Pickaxe,
  [ResourceType.Titanium]: Shield, // Best approximation for space alloy
  [ResourceType.Plants]: Sprout,
  [ResourceType.Energy]: Zap,
  [ResourceType.Heat]: Flame,
};

export const RESOURCE_COLORS: Record<ResourceType, string> = {
  [ResourceType.MegaCredits]: 'text-yellow-400',
  [ResourceType.Steel]: 'text-amber-700',
  [ResourceType.Titanium]: 'text-slate-400',
  [ResourceType.Plants]: 'text-green-500',
  [ResourceType.Energy]: 'text-purple-400',
  [ResourceType.Heat]: 'text-red-500',
};

export const INITIAL_GAME_STATE = {
  tr: 20,
  generation: 1,
  resources: {
    [ResourceType.MegaCredits]: 0,
    [ResourceType.Steel]: 0,
    [ResourceType.Titanium]: 0,
    [ResourceType.Plants]: 0,
    [ResourceType.Energy]: 0,
    [ResourceType.Heat]: 0,
  },
  production: {
    [ResourceType.MegaCredits]: 0,
    [ResourceType.Steel]: 0,
    [ResourceType.Titanium]: 0,
    [ResourceType.Plants]: 0,
    [ResourceType.Energy]: 0,
    [ResourceType.Heat]: 0,
  },
  tags: {
    science: 0,
    building: 0,
    space: 0,
    microbe: 0,
    plant: 0,
    animal: 0,
    jovian: 0,
    earth: 0,
    city: 0,
    event: 0,
  },
  globalParameters: {
    temperature: -30,
    oxygen: 0,
    oceans: 0,
  },
  milestones: {
    terraformer: false,
    mayor: false,
    gardener: false,
    builder: false,
    planner: false,
  },
};

export const MILESTONE_REQUIREMENTS = {
  terraformer: { description: 'TR ≥ 35', target: 35, type: 'tr' },
  mayor: { description: '3 City Tiles', target: 3, type: 'tags.city' }, // Simplified: usually tracks tiles, but tags approx
  gardener: { description: '3 Greenery Tiles', target: 3, type: 'tiles.greenery' }, 
  builder: { description: '8 Building Tags', target: 8, type: 'tags.building' },
  planner: { description: '16 Cards in Hand', target: 16, type: 'hand' },
};