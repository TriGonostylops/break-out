import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { GameMap } from '../../models/map.interface';
import { Player } from '../../models/player.interface';
import { Tile } from '../../models/tile.interface';

import { MapService } from '../../services/map.service';
import { PlayerService } from '../../services/player.service';
import { GameEngineService } from '../../services/game-engine.service';

import { TimerComponent } from '../../components/timer/timer.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIconModule, TimerComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @ViewChild(TimerComponent)
  timerComponent!: TimerComponent;

  map!: GameMap;
  player!: Player;
  exitUnlocked: boolean = false;
  private isComputerDialogOpen = false;
  backgroundImage!: string;

  constructor(
    private route: ActivatedRoute,
    private mapService: MapService,
    private playerService: PlayerService,
    private gameEngine: GameEngineService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    const mapId = this.route.snapshot.paramMap.get('id')!;
    this.mapService.getMapById(mapId).subscribe((map) => {
      if (map) {
        this.map = map;
        this.backgroundImage = `url(${map.imageUrl})`;
      }
    });
    this.player = this.playerService.getPlayer();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (this.isComputerDialogOpen) return;
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
    const targetX = this.player.position.x + deltaX;
    const targetY = this.player.position.y + deltaY;
    if (this.map.grid[targetY]?.[targetX]?.passable) {
      this.player = this.gameEngine.movePlayer(
        this.player,
        this.map,
        deltaX,
        deltaY
      );
    }
  }

  async onTileClick(tile: Tile): Promise<void> {
    this.isComputerDialogOpen = true;
    const levelComplete = await this.gameEngine.handleTileClick(
      tile,
      this.player,
      this.map,
      this.timerComponent,
      this.dialog,
      this.router
    );
    if (levelComplete) {
      this.exitUnlocked = true;
    }
    this.isComputerDialogOpen = false;
  }
}
