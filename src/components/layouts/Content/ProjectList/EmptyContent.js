import React from "react";
import { Empty, Button } from "antd";
import { Link } from "react-router-dom";
import { UseModal } from "../../../../hooks/UseModal";
import { CreateWrapper } from "../Dashboard/CreateProject/wrapper";

export const EmptyContent = () => {
  const [ModalH, { toggleVisibleState }] = UseModal({
    title: <h2>New project</h2>,
    footer: null,
    width: 700,
    bodyStyle: {
      paddingTop: 0,
    },
    maskClosable: false,
  });
  return (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{
        height: 60,
      }}
      description={<span>No Project Created Yet.</span>}
    >
      <Link to={"/project/all"}>
        <Button type="primary" onClick={() => toggleVisibleState(true)}>
          Create Now
        </Button>
      </Link>

      <ModalH>
        <CreateWrapper toggleModal={toggleVisibleState} />
      </ModalH>
    </Empty>
  );
};
