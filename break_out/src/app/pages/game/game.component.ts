import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MapService } from '../../services/map.service';
import { PlayerService } from '../../services/player.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { GameMap } from '../../models/map.interface';
import { Player } from '../../models/player.interface';
import { TimerComponent } from '../../components/timer/timer.component';
import { Tile } from '../../models/tile.interface';
import { DoorComponent } from '../../components/door/door.component';

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
  exitUnlocked: boolean = false;
  private isComputerDialogOpen = false;

  constructor(
    private route: ActivatedRoute,
    private mapService: MapService,
    private playerService: PlayerService,
    private dialog: MatDialog,
    private router: Router // Added Router for navigation
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
    const newX = this.player.position.x + deltaX;
    const newY = this.player.position.y + deltaY;
    if (this.map && this.map.grid[newY] && this.map.grid[newY][newX]) {
      const targetTile = this.map.grid[newY][newX];
      if (targetTile.passable) {
        this.playerService.updatePosition(newX, newY);
        this.player = this.playerService.getPlayer();
      }
    }
  }

  onTileClick(tile: Tile): void {
    const dx = Math.abs(tile.x - this.player.position.x);
    const dy = Math.abs(tile.y - this.player.position.y);
    const isAdjacent = Math.max(dx, dy) === 1;

    if (tile.gameObject?.interactable && isAdjacent) {
      if (tile.gameObject.type === 'door') {
        this.isComputerDialogOpen = true;
        const dialogRef = this.dialog.open(DoorComponent, {
          width: '400px',
          data: { password: 'password' }
        });

        dialogRef.componentInstance.doorUnlocked.subscribe((unlocked: boolean) => {
          if (unlocked) {
            this.exitUnlocked = true;
            console.log('Door unlocked!');
            dialogRef.close(); 
            alert('Level completed! Returning to map selection.');
            this.router.navigate(['/map-selector']);
          }
        });

        dialogRef.afterClosed().subscribe(() => {
          this.isComputerDialogOpen = false;
        });
      }
    }
  }
}
