import { Notifications } from './notifications';

export async function runNotificationSamples() {
  await Notifications.basic('Hello', 'Basic notification');
  await Notifications.headsUp('Heads Up', 'High priority notification');
  await Notifications.bigText('Big Text', 'Summary line', 'This is a much longer body of text that will expand to multiple lines in the notification to provide more detail to the user.');
  await Notifications.inbox('Inbox Style', ['Line 1', 'Line 2', 'Line 3'], '3 new updates');
  await Notifications.bigPicture('Big Picture', 'Check out this image', 'https://picsum.photos/600/300');
  await Notifications.progress('Downloading', 'Downloading data...', 45);
  const in5sec = Date.now() + 5000;
  await Notifications.schedule('Scheduled', 'This appears in ~5s', in5sec);
}
