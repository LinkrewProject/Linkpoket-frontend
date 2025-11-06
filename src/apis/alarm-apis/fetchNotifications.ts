import { NotificationItem } from '@/types/modalAlarm';
import { axiosInstance } from '../axiosInstance';

export const fetchNotifications = async (): Promise<NotificationItem[]> => {
  const response = await axiosInstance.get('/api/dispatch/notifications');
  const { SharePageInvitationRequests = [], FolderTransmissionRequests = [] } =
    response.data.data;

  const merged: NotificationItem[] = [
    ...SharePageInvitationRequests,
    ...FolderTransmissionRequests,
  ];

  return merged;
};
