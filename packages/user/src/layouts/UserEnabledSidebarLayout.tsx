import { configContext } from "@dzangolab/react-config";
import { AppHeader, CollapsibleSidebarLayout } from "@dzangolab/react-layout";
import { useContext } from "react";

import useUser from "@/hooks/useUser";

import UserMenu from "../components/UserMenu";

interface Properties {
  children: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
}

const UserEnabledSidebarLayout: React.FC<Properties> = (properties) => {
  const appConfig = useContext(configContext);
  const { user } = useUser();

  const route = user
    ? appConfig?.user?.routes?.home?.private
    : appConfig?.user?.routes?.home?.public;

  const {
    children,
    header = <AppHeader userMenu={<UserMenu />} route={route} />,
    footer,
    sidebar,
  } = properties;

  return (
    <CollapsibleSidebarLayout
      children={children}
      footer={footer}
      header={header}
      sidebar={user ? sidebar : null}
    />
  );
};

export default UserEnabledSidebarLayout;
