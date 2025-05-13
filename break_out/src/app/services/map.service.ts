import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GameMap } from '../models/map.interface';
import { Tile } from '../models/tile.interface';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private mapPasswords: { [mapId: string]: string } = {
    map1: 'password',
    map2: 'forest42',
    map3: 'sandstorm',
  };

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
        grid[8][9].gameObject = {
          id: 'door1',
          type: 'door',
          interactable: true,
          avatarUrl: 'maps/door.webp',
        };
        for (let y = 0; y <= 2; y++) {
          grid[y][3].passable = false;
          grid[y][4].passable = false;
          grid[y][5].passable = false;
        }
        for (let y = 6; y <= 9; y++) {
          grid[y][3].passable = false;
          grid[y][4].passable = false;
          grid[y][5].passable = false;
        }
        for (let y = 2; y <= 5; y++) {
          grid[y][7].passable = false;
          grid[y][8].passable = false;
          grid[y][9].passable = false;
        }
        return grid;
      })(),
      spawnPoint: { x: 0, y: 0 },
    },
    {
      id: 'map2',
      name: 'Citiscape 2',
      description: 'A mysterious forest level hiding secret challenges.',
      imageUrl: 'maps/lvl2.webp',
      grid: (() => {
        const grid = this.createGrid(10, 10);
        grid[4][9].gameObject = {
          id: 'door1',
          type: 'door',
          interactable: true,
          avatarUrl: 'maps/door.webp',
        };
        for (let y = 3; y <= 6; y++) {
          grid[y][2].passable = false;
          grid[y][3].passable = false;
          grid[y][4].passable = false;
          grid[y][5].passable = false;
        }
        return grid;
      })(),
      spawnPoint: { x: 4, y: 0 },
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
    const found = this.maps.find((m) => m.id === id);
    return of(found);
  }
  getPasswordForMap(mapId: string): string | undefined {
    return this.mapPasswords[mapId];
  }
}
