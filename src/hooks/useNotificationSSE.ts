import { useEffect, useState, useRef } from 'react';
import { useNotificationStore } from '@/stores/notification';

export function useNotificationSSE(isLoggedIn: boolean) {
  const [sseToken, setSseToken] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sse_token');
    }
    return null;
  });

  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const setUnreadCount = useNotificationStore((s) => s.setUnreadCount);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const SSE_CONFIG = {
    HEALTH_CHECK_TIMEOUT: 3000,
    RECONNECT_DELAY: 5000,
    TOKEN_UPDATE_DELAY: 100,
  } as const;

  // SSE 연결 해제 함수
  const closeConnection = () => {
    if (eventSourceRef.current) {
      console.log('🧹 SSE 연결 종료');
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  };

  // 다른 탭에서 localStorage 변경 시 자동 감지
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'sse_token') {
        setSseToken(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // SSE 연결 관리
  useEffect(() => {
    const connectSSE = async () => {
      // 기존 연결이 있다면 정리
      closeConnection();

      if (!isLoggedIn || !sseToken) return;

      // SSE 토큰 유효성 검사 제거 (연결 시도해보고 실패하면 onerror에서 처리)

      const eventSource = new EventSource(
        `${API_BASE_URL}/api/notification/subscribe?token=${encodeURIComponent(sseToken)}`,
        {
          withCredentials: true,
        }
      );

      eventSourceRef.current = eventSource;
      const isDevelopment = import.meta.env.DEV;

      eventSource.onopen = (event) => {
        if (isDevelopment) console.log('✅ SSE 연결 성공', event);
      };

      eventSource.onmessage = (event) => {
        console.log('🔔 SSE 메시지 받음!', event.data); // ← 이 로그가 나와야 함

        try {
          const data = JSON.parse(event.data);
          console.log('🔔 SSE 파싱된 데이터:', data);
          setUnreadCount(data.countUnreadNotifications);
        } catch (e) {
          console.error('🔍 알림 데이터 파싱 실패:', e, event.data);
        }
      };

      eventSource.onerror = (event) => {
        console.error('❌ SSE 연결 오류 발생:', event);
        closeConnection();

        // 로그인 상태이고 토큰이 있을 때만 재연결 시도
        if (isLoggedIn && sseToken) {
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log('🔄 SSE 재연결 시도');
            connectSSE();
          }, SSE_CONFIG.RECONNECT_DELAY);
        }
      };
    };

    connectSSE();

    // cleanup 함수
    return () => {
      closeConnection();
    };
  }, [isLoggedIn, sseToken]);

  // 외부에서 토큰 업데이트 호출 시 사용
  const updateToken = () => {
    const newToken = localStorage.getItem('sse_token');
    setSseToken(newToken);
  };

  // 연결 강제 재시작
  const reconnect = () => {
    closeConnection();
    setTimeout(() => {
      const currentToken = localStorage.getItem('sse_token');
      setSseToken(currentToken);
    }, SSE_CONFIG.TOKEN_UPDATE_DELAY);
  };

  return {
    updateToken,
    reconnect,
    isConnected: !!(
      isLoggedIn &&
      sseToken &&
      eventSourceRef.current?.readyState === EventSource.OPEN
    ),
  };
}
