import { FolderDetail } from './folders';
import { LinkDetail } from './links';

export interface CreateSharedPageData {
  pageType: 'SHARED';
}

export interface JoinedPageData {
  pageId: number;
  pageTitle: string;
  pageType: 'PERSONAL' | 'SHARED';
}

export interface PageParamsData {
  pageId: number;
}

export interface PageDetails {
  pageId: number;
  pageTitle: string;
  rootFolderId: number;
  directoryDetailRespons: FolderDetail[];
  siteDetailResponses: LinkDetail[];
  fullPath: string;
}

export interface DeleteSharedPageData {
  baseRequest: {
    pageId: number;
    commandType: string;
  };
}

export interface UpdatePageTitleData {
  baseRequest: {
    pageId: number;
    commandType: string;
  };
  pageTitle: string;
}

export interface PageControllerSectionProps {
  folderDataLength: number;
  linkDataLength: number;
  onSortChange: (sortType: string) => void;
}

export interface PageContentSectionProps {
  folderData: FolderDetail[];
  linkData: LinkDetail[];
  sortType: string;
}

export interface UpdateSharedPageInvitationData {
  baseRequest: {
    pageId: number;
    commandType: 'SHARED_PAGE_INVITATION';
  };
  receiverEmail: string;
  permissionType: string;
}

export interface UpdateSharedPagePermissionData {
  baseRequest: {
    pageId: number;
    commandType: 'SHARED_PAGE_PERMISSION_CHANGE';
  };
  targetMemberId: string;
  permissionType: string | null;
}

export interface PatchSharedPageInvitationData {
  dispatchRequestId: number;
  requestStatus: string;
  notificationType: string;
}

export interface PageData {
  status: number;
  message: string;
  data: {
    pageId: number;
    pageTitle: string;
    rootFolderId: number;
    directoryDetailRespons: any[];
    siteDetailResponses: any[];
    fullPath: string;
  };
}
