import { Injectable } from '@angular/core';
import {
  collection,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export interface ScoreEntry {
  userId: string;
  userEmail?: string;
  timeTaken: number;
  completedAt: Date | null;
}

@Injectable({ providedIn: 'root' })
export class ScoreboardService {
  async getAllScores(): Promise<{ [mapId: string]: ScoreEntry[] }> {
    console.log('Fetching all scores from Firestore...');
    try {
      const leaderboardRef = collection(db, 'leaderboard');
      const snapshot = await getDocs(leaderboardRef);
      console.log('Documents fetched:', snapshot.size);

      const results: { [mapId: string]: ScoreEntry[] } = {};

      snapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        const data = doc.data();
        const mapId = data['mapId'] as string | undefined;
        if (!mapId) {
          console.warn('Document missing mapId:', doc.id);
          return;
        }

        if (!results[mapId]) {
          results[mapId] = [];
        }

        results[mapId].push({
          userId: data['userId'] ?? 'unknown',
          userEmail: data['userEmail'] ?? 'unknown',
          timeTaken:
            typeof data['timeTaken'] === 'string'
              ? data['timeTaken'].slice(0, -13)
              : data['timeTaken'] ?? 0,
          completedAt: data['completedAt']?.toDate?.() ?? null,
        });
      });

      return results;
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return {};
    }
  }
}
