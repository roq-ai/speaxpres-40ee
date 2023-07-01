import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface VideoTaskInterface {
  id?: string;
  difficulty_level: string;
  speech_goal: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface VideoTaskGetQueryInterface extends GetQueryInterface {
  id?: string;
  difficulty_level?: string;
  speech_goal?: string;
  organization_id?: string;
}
