import { ConfigProvider } from "@dzangolab/react-config";
import i18n from "@dzangolab/react-i18n";
import { UserProvider } from "@dzangolab/react-user";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import config from "./config";

import "normalize.css";

import "@dzangolab/react-ui/dist/DzangolabReactUI.css";
import "@dzangolab/react-i18n/dist/DzangolabReactI18n.css";
import "@dzangolab/react-user/dist/DzangolabReactUser.css";

i18n(config.i18n);

// superTokens(config);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ConfigProvider appConfig={config}>
    <UserProvider>
      <React.Suspense>
        <App />
      </React.Suspense>
    </UserProvider>
  </ConfigProvider>
);
