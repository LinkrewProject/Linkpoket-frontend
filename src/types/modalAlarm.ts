export type NotificationType = 'INVITE_PAGE' | 'TRANSMIT_DIRECTORY';

export type NotificationRequestStatus = 'WAITING' | 'ACCEPTED' | 'REJECTED';

export interface SenderInfo {
  email: string;
  nickname: string;
  colorCode: string;
  sentAt: string;
}

export interface NotificationItem {
  dispatchRequestId: number;
  senderInfo: SenderInfo;
  requestStatus: NotificationRequestStatus;
  notificationType: NotificationType;
  message: string;
}

export interface NotificationModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notifications: NotificationItem[];
  isProcessing: boolean;
  isShareProcessing: boolean;
  onAccept?: (params: {
    dispatchRequestId: number;
    type: NotificationType;
  }) => void;
  onReject?: (params: {
    dispatchRequestId: number;
    type: NotificationType;
  }) => void;
  onDelete?: (dispatchRequestId: number, type: NotificationType) => void;
}
