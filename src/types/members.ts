export interface PageMember {
  memberId: number;
  email: string;
  nickName: string;
  colorCode: string;
  role: 'HOST' | 'EDITOR' | 'VIEWER';
  isWaiting: boolean;
}

export interface SharedPageDashboardResponse {
  status: number;
  message: string;
  data: {
    pageId: string;
    visibility: 'PUBLIC' | 'RESTRICTED';
    pageType: 'SHARED';
    pageMembers: PageMember[];
  };
}

export interface SharedPageMemberList {
  status: number;
  message: string;
  data: {
    memberId: string;
    email: string;
    nickName: string;
    colorCode: string;
  };
}
