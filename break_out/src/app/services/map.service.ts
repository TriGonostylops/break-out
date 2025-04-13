import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GameMap } from '../models/map.interface';
import { Tile } from '../models/tile.interface';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private createGrid(rows: number, cols: number): Tile[][] {
    let grid: Tile[][] = [];
    for (let x = 0; x < rows; x++) {
      let row: Tile[] = [];
      for (let y = 0; y < cols; y++) {
        row.push({
          x,
          y,
          passable: true, // set false for walls or obstacles
        });
      }
      grid.push(row);
    }
    return grid;
  }
  private maps: GameMap[] = [
    {
      id: 'map1',
      name: 'Cityscape',
      description: 'Urban level filled with puzzles amidst skyscrapers.',
      imageUrl: 'maps/cityscape.png',
      grid: (() => {
        const grid = this.createGrid(10, 10);
        grid[0][9].gameObject = {
          id: 'door1',
          type: 'door',
          interactable: true,
          avatarUrl: 'maps/door.webp', 
        };
        return grid;
      })(),
      spawnPoint: { x: 0, y: 0 }, 
    },
    {
      id: 'map2',
      name: 'Forest',
      description: 'A mysterious forest level hiding secret challenges.',
      imageUrl: 'maps/forest.png',
      grid: this.createGrid(10, 10),
      spawnPoint: { x: 0, y: 0 }, 
    },
    {
      id: 'map3',
      name: 'Desert',
      description: 'A sprawling desert level with hidden treasures.',
      imageUrl: '/maps/desert.png',
      grid: this.createGrid(10, 10),
      spawnPoint: { x: 0, y: 0 }, 
    },
  ];

  getMaps(): Observable<GameMap[]> {
    return of(this.maps);
  }
  getMapById(id: string): Observable<GameMap | undefined> {
    const found = this.maps.find(m => m.id === id);
    return of(found);
  }
}
