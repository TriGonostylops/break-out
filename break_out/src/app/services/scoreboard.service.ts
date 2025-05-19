import { Injectable } from '@angular/core';
import {
  collection,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Timestamp,
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

      const results: { [mapId: string]: ScoreEntry[] } = {};

      snapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        const data = doc.data();
        const mapId = data['mapId'] as string | undefined;
        if (!mapId) {
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
      return {};
    }
  }

  async getTopScoresForMap(mapId: string, topN: number): Promise<ScoreEntry[]> {
    const leaderboardRef = collection(db, 'leaderboard');
    const q = query(
      leaderboardRef,
      where('mapId', '==', mapId),
      orderBy('timeTaken', 'asc'),
      limit(topN)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        userId: data['userId'] ?? 'unknown',
        userEmail: data['userEmail'] ?? 'unknown',
        timeTaken: data['timeTaken'] ?? 0,
        completedAt: data['completedAt']?.toDate?.() ?? null,
      };
    });
  }

  async getScoresForUser(userId: string): Promise<ScoreEntry[]> {
    const leaderboardRef = collection(db, 'leaderboard');
    const q = query(
      leaderboardRef,
      where('userId', '==', userId),
      orderBy('completedAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        userId: data['userId'] ?? 'unknown',
        userEmail: data['userEmail'] ?? 'unknown',
        timeTaken: data['timeTaken'] ?? 0,
        completedAt: data['completedAt']?.toDate?.() ?? null,
      };
    });
  }

  async getScoresAfterDate(date: Date): Promise<ScoreEntry[]> {
    const leaderboardRef = collection(db, 'leaderboard');
    const q = query(
      leaderboardRef,
      where('completedAt', '>', Timestamp.fromDate(date)),
      orderBy('completedAt', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        userId: data['userId'] ?? 'unknown',
        userEmail: data['userEmail'] ?? 'unknown',
        timeTaken: data['timeTaken'] ?? 0,
        completedAt: data['completedAt']?.toDate?.() ?? null,
      };
    });
  }

  async getPaginatedScoresForMap(
    mapId: string,
    pageSize: number,
    lastTimeTaken?: number
  ): Promise<ScoreEntry[]> {
    const leaderboardRef = collection(db, 'leaderboard');
    let q;
    if (lastTimeTaken !== undefined) {
      q = query(
        leaderboardRef,
        where('mapId', '==', mapId),
        orderBy('timeTaken', 'asc'),
        startAfter(lastTimeTaken),
        limit(pageSize)
      );
    } else {
      q = query(
        leaderboardRef,
        where('mapId', '==', mapId),
        orderBy('timeTaken', 'asc'),
        limit(pageSize)
      );
    }
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        userId: data['userId'] ?? 'unknown',
        userEmail: data['userEmail'] ?? 'unknown',
        timeTaken: data['timeTaken'] ?? 0,
        completedAt: data['completedAt']?.toDate?.() ?? null,
      };
    });
  }
}
