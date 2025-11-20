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

export interface PatchSharedPageInvitationResponseData {
  status: number;
  message: string;
  data: {
    dispatchRequestId: string;
    requestStatus: 'ACCEPTED' | 'REJECTED';
    senderEmail: string;
    notificationType: string;
  };
}

export interface PageData {
  status: number;
  message: string;
  data: {
    pageId: string;
    pageTitle: string;
    rootFolderId: string;
    pageImageUrl: string;
    folderDetailResponses: FolderDetail[];
    linkDetailResponses: LinkDetail[];
    fullPath: string;
    pageVisibility: 'PUBLIC' | 'RESTRICTED';
  };
}

export interface JoinedPageFolder {
  folderId: string;
  folderName: string;
  orderIndex: number;
}

export interface JoinedPageItem {
  pageId: number;
  pageTitle: string;
  pageType: 'PERSONAL' | 'SHARED';
  pageImageUrl: string;
  folders: JoinedPageFolder[];
}

export interface FetchJoinedPageResponseData {
  status: number;
  message: string;
  data: JoinedPageItem[];
}
