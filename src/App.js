import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Layout } from "antd";

import { Notification } from "./services";
import { getUID } from "./selectors/user";
import { AppProvider } from "./contexts/AppContext";
import * as serviceWorker from "./services/serviceWorker";
import { Container } from "./components/layouts/Content/container";
import { FooterComponent } from "./components/layouts/Footer/Footer";
import { HeaderComponent } from "./components/layouts/Header/Header";
import { SidebarComponent } from "./components/layouts/Sidebar/Sidebar";

export const App = () => {
  const { uid } = useSelector(getUID);
  useEffect(() => {
    Notification.setUserId(uid);
    serviceWorker.register();
  }, [uid]);

  const [state, setState] = useState({ collapsed: false });

  const toggle = () => setState(() => ({ collapsed: !state.collapsed }));

  return (
    <AppProvider>
      <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
        <Layout>
          <HeaderComponent toggle={toggle} collapsed={state.collapsed} />

          <Layout>
            <SidebarComponent collapsed={state.collapsed} />

            <Layout>
              <Container />

              <FooterComponent />
            </Layout>
          </Layout>
        </Layout>
      </motion.div>
    </AppProvider>
  );
};
