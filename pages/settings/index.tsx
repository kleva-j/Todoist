import React from "react";
import { Tabs, TabList, Tab, TabPanel, TabPanels } from "@chakra-ui/react";

import EditProfile from "components/molecules/Profile/EditProfile";
import Authenticated from "layout/authenticated";
import Layout from "components/organisms/Layout";
import { NextPage } from "next";

const Settings: NextPage = () => {
  return (
    <Layout>
      <Authenticated>
        {/* <Tabs isManual variant="enclosed">
          <TabList>
            <Tab>One</Tab>
            <Tab>Two</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs> */}
        <EditProfile />
      </Authenticated>
    </Layout>
  );
};

export default Settings;
