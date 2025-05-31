import axios from 'axios';
import { NotificationItem } from '@/types/modalAlarm';

export const fetchNotifications = async (): Promise<NotificationItem[]> => {
  try {
    const response = await axios.get('/api/dispatch/notifications');
    console.log('알림조회데이터:', response);
    const {
      SharePageInvitationRequests = [],
      DirectoryTransmissionRequests = [],
    } = response.data.data;

    const merged: NotificationItem[] = [
      ...SharePageInvitationRequests,
      ...DirectoryTransmissionRequests,
    ];

    return merged;
  } catch (error) {
    console.error('알림 조회 에러:', error);
    throw error;
  }
};
