import { Injectable } from '@angular/core';
import { Player } from '../models/player.interface';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private currentPlayer: Player = {
    id: 'player1',
    username: 'PlayerOne',
    position: { x: 0, y: 0 },
    score: 0,
    avatarUrl: 'maps/player.png',
  };

  getPlayer(): Player {
    return this.currentPlayer;
  }

  updatePosition(newX: number, newY: number): void {
    this.currentPlayer.position = { x: newX, y: newY };
  }

  updateScore(newScore: number): void {
    this.currentPlayer.score = newScore;
  }

  setPlayerToSpawn(spawnPoint: { x: number; y: number }): void {
    this.currentPlayer.position = { ...spawnPoint };
  }

  resetPlayer(spawnPoint: { x: number; y: number } = { x: 0, y: 0 }): void {
    this.currentPlayer = {
      id: 'player1',
      username: 'PlayerOne',
      position: { ...spawnPoint },
      score: 0,
      avatarUrl: 'maps/player.png',
    };
  }
}
