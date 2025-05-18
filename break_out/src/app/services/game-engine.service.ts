import { Injectable } from '@angular/core';
import { Player } from '../models/player.interface';
import { GameMap } from '../models/map.interface';
import { Tile } from '../models/tile.interface';
import { PlayerService } from './player.service';
import { TimerComponent } from '../components/timer/timer.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DoorComponent } from '../components/door/door.component';
import { NoteComponent } from '../components/note/note.component';
import { getAuth } from 'firebase/auth';
import { doc, setDoc, getDoc, DocumentData } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root',
})
export class GameEngineService {
  constructor(
    private playerService: PlayerService,
    private mapService: MapService
  ) {}

  movePlayer(
    player: Player,
    map: GameMap,
    deltaX: number,
    deltaY: number
  ): Player {
    const newX = player.position.x + deltaX;
    const newY = player.position.y + deltaY;

    if (map.grid[newY]?.[newX]?.passable) {
      this.playerService.updatePosition(newX, newY);
      return this.playerService.getPlayer();
    }

    return player;
  }

  async handleTileClick(
    tile: Tile,
    player: Player,
    map: GameMap,
    timerComponent: TimerComponent,
    dialog: MatDialog,
    router: Router
  ): Promise<boolean> {
    const dx = Math.abs(tile.x - player.position.x);
    const dy = Math.abs(tile.y - player.position.y);
    const isAdjacent = Math.max(dx, dy) <= 1;

    // Handle door interaction
    if (
      tile.gameObject?.interactable &&
      isAdjacent &&
      tile.gameObject.type === 'door'
    ) {
      const doorPassword =
        this.mapService.getPasswordForMap(map.id) || 'default';
      const doorClue = this.mapService.getDoorClueForMap(map.id) || '';

      const dialogRef = dialog.open(DoorComponent, {
        width: '400px',
        data: { password: doorPassword, clue: doorClue },
      });

      const unlocked: boolean = await new Promise((resolve) => {
        dialogRef.componentInstance.doorUnlocked.subscribe(resolve);
      });

      if (unlocked) {
        dialogRef.close();
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const completionTime = timerComponent.elapsedTime;
          const mapRef = doc(db, 'users', user.uid, 'completedMaps', map.id);

          const existingDoc = await getDoc(mapRef);
          const existingData: DocumentData | undefined = existingDoc.exists()
            ? existingDoc.data()
            : undefined;
          const existingTime = existingData
            ? existingData['timeTaken']
            : Infinity;

          if (completionTime < existingTime) {
            await setDoc(mapRef, {
              timeTaken: completionTime,
              completedAt: new Date(),
            });
          }
        }

        alert('Level completed! Returning to map selection.');
        router.navigate(['/map-selector']);
        return true;
      }
    }

    if (
      tile.gameObject?.interactable &&
      isAdjacent &&
      tile.gameObject.type === 'note'
    ) {
      const noteId = tile.gameObject.id;
      const noteMessage =
        this.mapService.getNoteMessage(map.id, noteId) || 'No message found.';
      dialog.open(NoteComponent, {
        width: '350px',
        data: { message: noteMessage },
      });
      return false;
    }

    return false;
  }
}
