import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GameMap } from '../models/map.interface';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private maps: GameMap[] = [
    {
      id: 'map1',
      name: 'Cityscape',
      description: 'Urban level filled with puzzles amidst skyscrapers.',
      imageUrl: 'maps/cityscape.png'
    },
    {
      id: 'map2',
      name: 'Forest',
      description: 'A mysterious forest level hiding secret challenges.',
      imageUrl: 'maps/forest.png'
    },
    {
      id: 'map3',
      name: 'Desert',
      description: 'A sprawling desert level with hidden treasures.',
      imageUrl: '/maps/desert.png'
    }
  ];

  getMaps(): Observable<GameMap[]> {
    return of(this.maps);
  }
}
