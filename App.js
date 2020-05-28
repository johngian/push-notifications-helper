import * as React from "react";
import { Text, View } from "react-native";
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
    notification: {},
  });

  React.useEffect(() => {
    async function setup() {
      let token = await initPush();
      setState({ devicePushToken: token });

      ExpoNotifications.addListener((notification) => {
        console.log(notification);
        setState({ notification: notification });
      });
    }
    setup();
  }, []);

  return (
    <View>
      <Text>Push notifications debugger</Text>
      <Text>{JSON.stringify(state)}</Text>
    </View>
  );
}
