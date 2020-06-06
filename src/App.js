import React, { useState } from 'react';
import { Layout } from 'antd';
import { motion } from 'framer-motion';

import { SidebarComponent } from './components/layouts/Sidebar/Sidebar';
import { HeaderComponent } from './components/layouts/Header/Header';
import { FooterComponent } from './components/layouts/Footer/Footer';
import { Container } from './components/layouts/Content/container';
import { AppProvider } from './contexts/AppContext';

export const App = () => {

  const [state, setState] = useState({
    collapsed: false,
  });

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };

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
