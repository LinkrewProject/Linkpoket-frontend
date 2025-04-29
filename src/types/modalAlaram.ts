export interface NotificationItem {
  id: number;
  type: 'link' | 'edit';
  senderEmail?: string;
  receiverEmail?: string;
  directoryName?: string;
  dateTime: string;
  iconUrl?: string;
}

export interface NotificationModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notifications: NotificationItem[];
  onAccept?: (id: number) => void;
  onReject?: (id: number) => void;
  onDelete?: (id: number) => void;
}
