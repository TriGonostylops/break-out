// src/app/pages/game/game.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapService } from '../../services/map.service';
import { GameMap } from '../../models/map.interface';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { TimerComponent } from '../../components/timer/timer.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [MatCardModule, CommonModule, TimerComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  map!: GameMap;

  constructor(private route: ActivatedRoute, private mapService: MapService) {}

  ngOnInit(): void {
    const mapId = this.route.snapshot.paramMap.get('id')!;
    this.mapService.getMapById(mapId).subscribe((map) => {
      if (map) {
        this.map = map;
      }
    });
  }
}
