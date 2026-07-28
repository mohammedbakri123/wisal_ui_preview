export type NotificationType = 'mention' | 'invite' | 'system' | 'message'

export interface NotificationRecord {
  id: string
  title: string
  body: string
  time: string
  isUnread: boolean
  type: NotificationType
  path: string
}

export const notificationsService = {
  async list(): Promise<NotificationRecord[]> {
    return [
      {
        id: 'n1',
        title: 'Jordan Lee mentioned you',
        body: 'in Design Team: "@alex check out the mockup on slide 2"',
        time: '10m ago',
        isUnread: true,
        type: 'mention',
        path: '/home/g/c2',
      },
      {
        id: 'n2',
        title: 'Group Invitation',
        body: 'Sam Rivera invited you to join organization "Engineering HQ"',
        time: '2h ago',
        isUnread: true,
        type: 'invite',
        path: '/organizations/org-acme',
      },
      {
        id: 'n3',
        title: 'New login detected',
        body: 'Your account was logged in from a new Chrome device on Linux.',
        time: '1d ago',
        isUnread: false,
        type: 'system',
        path: '/settings/devices',
      },
      {
        id: 'n4',
        title: 'Weekly stats report',
        body: 'Weekly usage analytics and active message report is now ready.',
        time: '3d ago',
        isUnread: false,
        type: 'system',
        path: '/channels',
      },
    ]
  },
}
