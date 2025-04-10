import { GameObject } from './game-object.interface';

export interface Tile {
    x: number;
    y: number;
    passable: boolean;            
    gameObject?: GameObject;
  }
  