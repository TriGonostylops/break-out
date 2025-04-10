import { Tile } from './tile.interface';

export interface GameMap {
    id: string;
    name: string;
    description: string;
    imageUrl: string; 
    grid: Tile[][]; 
  }
  