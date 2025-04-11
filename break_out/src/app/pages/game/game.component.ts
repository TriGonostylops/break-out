import {Component, HostListener, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapService } from '../../services/map.service';
import { PlayerService } from '../../services/player.service';
import { MatCardModule } from '@angular/material/card';
import {CommonModule} from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { GameMap } from '../../models/map.interface';
import { Player } from '../../models/player.interface';
import {TimerComponent} from '../../components/timer/timer.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIconModule, TimerComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  map!: GameMap;
  player!: Player;

  constructor(
    private route: ActivatedRoute,
    private mapService: MapService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    const mapId = this.route.snapshot.paramMap.get('id')!;
    this.mapService.getMapById(mapId).subscribe((map) => {
      if (map) {
        this.map = map;
      }
    });

    this.player = this.playerService.getPlayer();
  }
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'a':
      case 'ArrowUp':
        this.movePlayer(0, -1);
        break;
      case 'd':
      case 'ArrowDown':
        this.movePlayer(0, 1);
        break;
      case 'w':
      case 'ArrowLeft':
        this.movePlayer(-1, 0);
        break;
      case 's':
      case 'ArrowRight':
        this.movePlayer(1, 0);
        break;
      default:
        break;
    }
  }

  movePlayer(deltaX: number, deltaY: number): void {
    // Calculate the new position
    const newX = this.player.position.x + deltaX;
    const newY = this.player.position.y + deltaY;

    // Optionally, check boundaries or if the new tile is passable
    if (this.map && this.map.grid[newY] && this.map.grid[newY][newX]) {
      const targetTile = this.map.grid[newY][newX];
      if (targetTile.passable) {
        this.playerService.updatePosition(newX, newY);
        // Refresh local player reference (or subscribe to updates from the service)
        this.player = this.playerService.getPlayer();
      }
    }
  }
}
