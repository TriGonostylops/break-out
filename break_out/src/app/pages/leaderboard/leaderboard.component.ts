import { Component, OnInit } from '@angular/core';
import {
  ScoreboardService,
  ScoreEntry,
} from '../../services/scoreboard.service';
import { CommonModule } from '@angular/common';
import { OrdinalPipe } from '../../pipes/ordinal.pipe';
import { MatCardModule } from '@angular/material/card';
import { auth } from '../../../firebase/firebase';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, OrdinalPipe, MatCardModule, MatTabsModule],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  scores: { [mapId: string]: ScoreEntry[] } = {};
  currentUserEmail: string | null = null; // Add this property

  topScores: ScoreEntry[] = [];
  topN = 5;
  selectedMapId = '';
  userScores: (ScoreEntry & { mapId?: string })[] = [];
  selectedUserId = '';
  scoresAfterDate: (ScoreEntry & { mapId?: string })[] = [];
  afterDate: Date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  constructor(private scoreboardService: ScoreboardService) {
    console.log('ScoreboardService injected');
  }

  async ngOnInit() {
    this.scores = await this.scoreboardService.getAllScores();

    const mapIds = Object.keys(this.scores);
    if (mapIds.length > 0) {
      this.selectedMapId = mapIds[0];
      this.topScores = await this.scoreboardService.getTopScoresForMap(
        this.selectedMapId,
        this.topN
      );
    }

    const currentUser = auth.currentUser;
    if (currentUser) {
      const userScoresRaw = await this.scoreboardService.getScoresForUser(
        currentUser.uid
      );
      this.userScores = userScoresRaw.map((entry) => ({
        ...entry,
        mapId: this.findMapIdForScore(entry),
      }));
    } else {
      this.userScores = [];
    }

    const scoresAfterRaw = await this.scoreboardService.getScoresAfterDate(
      this.afterDate
    );
    this.scoresAfterDate = scoresAfterRaw.map((entry) => ({
      ...entry,
      mapId: this.findMapIdForScore(entry),
    }));
  }

  getSortedScores(mapId: string): ScoreEntry[] {
    return (this.scores[mapId] || []).sort((a, b) => a.timeTaken - b.timeTaken);
  }

  get mapIds(): string[] {
    return Object.keys(this.scores);
  }

  private findMapIdForScore(entry: ScoreEntry): string | undefined {
    for (const mapId of Object.keys(this.scores)) {
      if (
        this.scores[mapId].some(
          (e) =>
            e.userId === entry.userId &&
            e.timeTaken === entry.timeTaken &&
            e.completedAt?.toString() === entry.completedAt?.toString()
        )
      ) {
        return mapId;
      }
    }
    return undefined;
  }
}
