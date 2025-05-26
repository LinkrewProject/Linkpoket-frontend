type CommandType = 'CREATE' | 'EDIT' | 'DELETE' | 'VIEW';

export type BaseRequest = {
  pageId: number;
  commandType: CommandType;
};

export type CreateLinkData = {
  baseRequest: BaseRequest;
  linkName: string;
  linkUrl: string;
  directoryId: number;
  faviconUrl: string;
};

export type DeleteLinkData = {
  baseRequest: BaseRequest;
  linkId: number;
};

export type UpdateLinkData = {
  baseRequest: BaseRequest;
  linkName: string;
  linkUrl: string;
  linkId: number;
};

export type CommonApiResponse = {
  status: number;
  message: string;
  data: number;
};

export type CreateLinkResponse = CommonApiResponse;
export type UpdateLinkResponse = CommonApiResponse;
export type DeleteLinkResponse = CommonApiResponse;
