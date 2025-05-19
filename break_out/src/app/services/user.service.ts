import { Injectable } from '@angular/core';
import { auth } from '../../firebase/firebase';
import { updateEmail, updatePassword, deleteUser, User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getCurrentUser(): User | null {
    return auth.currentUser;
  }

  async updateUserEmail(email: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error('No user is currently logged in.');
    await updateEmail(user, email);
  }

  async updateUserPassword(password: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error('No user is currently logged in.');
    await updatePassword(user, password);
  }

  async deleteCurrentUser(): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error('No user is currently logged in.');
    await deleteUser(user);
  }
}
