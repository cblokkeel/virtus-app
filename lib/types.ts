type Status = 'unauthenticated' | 'subscribed' | 'unsubscribed';

export interface NavLinks {
  name: string;
  label: string;
  path: string;
  isCta: boolean;
  status: Status[];
  action?: () => void;
}

export interface MenuLinks {
  name: string;
  label: string;
  section: number;
  action?: () => void;
  link?: string;
  red?: boolean;
}
