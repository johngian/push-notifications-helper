import * as React from "react";
import {
  Text,
  Card,
  Header,
  ThemeProvider,
  Divider,
} from "react-native-elements";
import { Notifications as ExpoNotifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

async function initPush() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await ExpoNotifications.getDevicePushTokenAsync();
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export default function App() {
  const [state, setState] = React.useState({
    devicePushToken: "",
    messages: [],
  });

  ExpoNotifications.addListener((notification) => {
    console.log(JSON.stringify(notification));
    let messages = state.messages;
    messages.push(notification);
    setState({ ...state, messages: messages });
  });

  React.useEffect(() => {
    async function setup() {
      let token = await initPush();
      setState({ ...state, devicePushToken: token });
    }
    setup();
  }, []);

  return (
    <ThemeProvider>
      <Header centerComponent={<Text>Push notification debugger</Text>} />
      <Card title="Push notification token">
        <Text>{JSON.stringify(state.devicePushToken, null, 2)}</Text>
      </Card>
      <Divider />
      <Card title="Events">
        {state.messages.map((item, index) => (
          <Text key={index}>{JSON.stringify(item, null, 2)}</Text>
        ))}
      </Card>
    </ThemeProvider>
  );
}
