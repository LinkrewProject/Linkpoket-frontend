export type ViewType = 'grid' | 'list';

export interface PageItemProps {
  item: {
    id: string;
    title: string;
  };
  isBookmark: boolean;
  setIsBookmark: React.Dispatch<React.SetStateAction<boolean>>;
  view: ViewType;
}

export interface PageContentSectionProps {
  view: ViewType;
}

export interface PageControllerSectionProps extends PageContentSectionProps {
  setView: React.Dispatch<React.SetStateAction<'list' | 'grid'>>;
}
