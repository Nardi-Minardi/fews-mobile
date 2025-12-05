import notifee, { AndroidImportance, AndroidStyle, TimestampTrigger, TriggerType, AndroidColor } from '@notifee/react-native';
import BackgroundActions from 'react-native-background-actions';
import { Platform } from 'react-native';

const CHANNEL_ID = 'high';

async function ensureChannel() {
  await notifee.createChannel({ id: CHANNEL_ID, name: 'High Priority', importance: AndroidImportance.HIGH, lights: true });
}

async function requestPermissions() {
  // iOS uses this; Android is a no-op
  await notifee.requestPermission();
}

// Using Notifee only; no push-notification config

export const Notifications = {
  async init() {
    await requestPermissions();
    await ensureChannel();
  },

  // Basic local notification
  async basic(title: string, body: string) {
    await notifee.displayNotification({
      title,
      body,
      android: { channelId: CHANNEL_ID, smallIcon: 'ic_launcher', pressAction: { id: 'default' } },
    });
  },

  // Heads-up / High priority
  async headsUp(title: string, body: string) {
    await notifee.displayNotification({
      title,
      body,
      android: { channelId: CHANNEL_ID, smallIcon: 'ic_launcher', pressAction: { id: 'default' } },
    });
  },

  // Big text style
  async bigText(title: string, summary: string, bigText: string) {
    await notifee.displayNotification({
      title,
      body: summary,
      android: { channelId: CHANNEL_ID, style: { type: AndroidStyle.BIGTEXT, text: bigText }, smallIcon: 'ic_launcher' },
    });
  },

  // Big picture style
  async bigPicture(title: string, body: string, picture: string, largeIcon?: string) {
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId: CHANNEL_ID,
        style: { type: AndroidStyle.BIGPICTURE, picture },
        largeIcon,
        smallIcon: 'ic_launcher',
      },
    });
  },

  // Inbox style
  async inbox(title: string, lines: string[], summary?: string) {
    await notifee.displayNotification({
      title,
      body: summary,
      android: { channelId: CHANNEL_ID, style: { type: AndroidStyle.INBOX, lines }, smallIcon: 'ic_launcher' },
    });
  },

  // Progress notification
  async progress(title: string, body: string, progress: number) {
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId: CHANNEL_ID,
        progress: { indeterminate: false, max: 100, current: Math.max(0, Math.min(100, Math.round(progress))) },
        smallIcon: 'ic_launcher',
        color: AndroidColor.BLUE,
      },
    });
  },

  // Scheduled notification (timestamp in ms)
  async schedule(title: string, body: string, timestampMs: number) {
    const trigger: TimestampTrigger = { type: TriggerType.TIMESTAMP, timestamp: timestampMs, alarmManager: true };
    await notifee.createTriggerNotification({ title, body, android: { channelId: CHANNEL_ID, smallIcon: 'ic_launcher' } }, trigger);
  },

  // Cancel
  async cancel(id: string) { await notifee.cancelNotification(id); },
  async cancelAll() { await notifee.cancelAllNotifications(); },

  // Foreground task using react-native-background-actions
  async startBackgroundTask(title: string, desc: string, task: (signal: { shouldStop: () => boolean }) => Promise<void>) {
    const options = {
      taskName: 'BackgroundTask',
      taskTitle: title,
      taskDesc: desc,
      taskIcon: { name: 'ic_launcher', type: 'mipmap' as const },
      color: '#0A84FF',
      parameters: {},
      linkingURI: undefined as string | undefined,
      progressBar: { max: 1, value: 0, indeterminate: true },
    };
    await BackgroundActions.start(async () => {
      const shouldStop = () => (BackgroundActions.isRunning() ? false : true);
      await task({ shouldStop });
    }, options);
  },
  async stopBackgroundTask() { await BackgroundActions.stop(); },
};

export type { TimestampTrigger };
