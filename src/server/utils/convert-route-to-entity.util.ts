const mapping: Record<string, string> = {
  organizations: 'organization',
  users: 'user',
  'user-data': 'user_data',
  'video-tasks': 'video_task',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
