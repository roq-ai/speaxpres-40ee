import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface UserDataInterface {
  id?: string;
  speech_accuracy?: string;
  fluency?: string;
  articulation?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface UserDataGetQueryInterface extends GetQueryInterface {
  id?: string;
  speech_accuracy?: string;
  fluency?: string;
  articulation?: string;
  user_id?: string;
}
