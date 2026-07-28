export const settingsService = {
  async getStorageSummary() {
    return {
      mediaCache: '248 MB',
      documents: '41 MB',
      network: '1.2 GB',
      backups: '3',
    }
  },
  async getDeviceSessions() {
    return [
      { name: 'Chrome on Linux', detail: 'Current session in Asia/Aden timezone.', current: true },
      { name: 'Safari on iPhone', detail: 'Last active 2 days ago.', current: false },
    ]
  },
}
