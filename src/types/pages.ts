import { FolderDetail } from './folders';
import { LinkDetail } from './links';

export interface BaseRequest {
  pageId: string;
  commandType: string;
}

interface PageBaseFields {
  pageId: string;
  pageTitle: string;
}

export interface CreateSharedPageData {
  pageType: 'SHARED';
}

export interface JoinedPageData extends PageBaseFields {
  pageType: 'PERSONAL' | 'SHARED';
}

export interface PageParamsData {
  pageId: string;
}

export interface PageDetails extends PageBaseFields {
  rootFolderId: string;
  directoryDetailRespons: FolderDetail[];
  siteDetailResponses: LinkDetail[];
  fullPath: string;
}

export interface DeleteSharedPageData {
  baseRequest: BaseRequest;
}

export interface UpdatePageTitleData {
  baseRequest: BaseRequest;
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
  baseRequest: BaseRequest & { commandType: 'SHARED_PAGE_INVITATION' };
  receiverEmail: string;
  permissionType: string;
}

export interface UpdateSharedPagePermissionData {
  baseRequest: BaseRequest & { commandType: 'SHARED_PAGE_PERMISSION_CHANGE' };
  targetMemberId: string;
  permissionType: string | null;
}

export interface PatchSharedPageInvitationData {
  dispatchRequestId: string;
  requestStatus: string;
  notificationType: string;
}

export interface PageData {
  status: number;
  message: string;
  data: {
    pageId: string;
    pageTitle: string;
    rootFolderId: string;
    directoryDetailRespons: any[];
    siteDetailResponses: any[];
    fullPath: string;
  };
}
