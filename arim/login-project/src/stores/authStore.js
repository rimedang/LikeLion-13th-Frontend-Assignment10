// src/stores/authStore.js

import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  isLoggedIn: false,
  user: null,
  error: null,
  successMessage: null, // 성공 메시지 상태 추가

  // 메시지 초기화 함수
  clearMessages: () => set({ error: null, successMessage: null }),

  login: async (username, password) => {
    set({ error: null, successMessage: null });
    await new Promise((r) => setTimeout(r, 500));

    if (!username || !password) {
      set({ error: '아이디와 비밀번호를 모두 입력해주세요.' });
      return false;
    }

    if (password.length < 6) {
      set({ error: '비밀번호는 최소 6자 이상이어야 합니다.' });
      return false;
    }

    if (!/\d/.test(password)) {
      set({ error: '비밀번호에는 최소 한 개의 숫자가 포함되어야 합니다.' });
      return false;
    }

    set({ isLoggedIn: true, user: { username }, error: null });
    return true;
  },

  logout: () => set({ isLoggedIn: false, user: null, error: null }),

  changePassword: async (currentPassword, newPassword, confirmPassword) => {
    set({ error: null, successMessage: null });
    await new Promise((r) => setTimeout(r, 500));

    if (!currentPassword || !newPassword || !confirmPassword) {
      set({ error: '모든 필드를 입력해주세요.' });
      return false;
    }
    if (newPassword !== confirmPassword) {
      set({ error: '새 비밀번호가 일치하지 않습니다.' });
      return false;
    }
    if (newPassword.length < 6 || !/\d/.test(newPassword)) {
      set({ error: '새 비밀번호는 6자 이상이며 숫자를 포함해야 합니다.' });
      return false;
    }

    set({ successMessage: '비밀번호가 성공적으로 변경되었습니다.' });
    return true;
  },
}));
