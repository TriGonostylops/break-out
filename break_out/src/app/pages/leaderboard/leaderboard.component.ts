import { Component, OnInit } from '@angular/core';
import { ScoreboardService, ScoreEntry } from '../../services/scoreboard.service';
import { CommonModule } from '@angular/common';
import { OrdinalPipe } from '../../pipes/ordinal.pipe';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, OrdinalPipe],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  scores: { [mapId: string]: ScoreEntry[] } = {};

  constructor(private scoreboardService: ScoreboardService) {
  console.log('ScoreboardService injected');}

  async ngOnInit() {
    this.scores = await this.scoreboardService.getAllScores();
    console.log('Scores loaded:', this.scores);
  }

  getSortedScores(mapId: string): ScoreEntry[] {
    return (this.scores[mapId] || []).sort((a, b) => a.timeTaken - b.timeTaken);
  }

  get mapIds(): string[] {
    return Object.keys(this.scores);
  }
}
