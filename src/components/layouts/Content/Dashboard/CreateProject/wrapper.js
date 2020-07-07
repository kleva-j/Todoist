import { Form, message } from "antd";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";
import { compose, withState, withHandlers } from "recompose";

import { ProjectModal } from ".";
import { FirebaseApp } from "../../../../../services";
import { getMemberProfile } from "../../../../../selectors/user";
import { genRandColor, generateUniqueId } from "../../../../../helpers";
import { ComponentFromStreamWrapper } from "../../../../Reuseables/Wrapper";

const Component = ComponentFromStreamWrapper(ProjectModal);

export const CreateWrapper = compose(
  withFirestore,
  connect(getMemberProfile),
  Form.create({ name: "New Project" }),
  withState("state", "setState", { loading: false }),
  withHandlers({
    handleSubmit: ({ form, user: { name, userId }, toggleModal, firestore, setState }) => (event) => {
      event.preventDefault();
      setState((prevState) => ({ ...prevState, loading: true }));
      form.validateFields((err, values) => {
        message.loading({ content: "Loading...", key: "updatable" });
        if (!err) {
          let contributors = [], date = new Date();
          if (values.contributors) {
            contributors = values.contributors.trim().split(" @").map((name) => ({ name }));
          }
          setTimeout(() => setState((prevState) => ({ ...prevState, loading: true })), 5000)
          // firestore
          //   .add({ collection: "projects" }, {
          //       id: generateUniqueId(20),
          //       img_src: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
          //       title: values.title,
          //       content: values.content,
          //       description: values.description,
          //       members: [userId],
          //       created_on: date,
          //       creator_id: userId,
          //       creator_name: name,
          //       status: "Running",
          //       tasks: [],
          //       timeline: [{ created_on: date }],
          //       contributors: contributors.concat({ name, id: userId }),
          //   })
          //   .then(async () => {
          //     // await setState((prevState) => ({ ...prevState, loading: false }));
          //     // await message.success({
          //     //   content: "New project created successfully!",
          //     //   key: "updatable",
          //     // });
          //     // await toggleModal(false);
          //     // FirebaseApp.analytics.logEvent("create_project", { title });
          //   })
          //   .catch(() => {
          //     message.error({
          //       content: "Check your internet connection",
          //       key: "updatable",
          //       duration: 1.3,
          //     });
          //     setState((prevState) => ({ ...prevState, loading: true }));
          //   });
        } else {
          message.error({
            content: "Error, Please fix error before submission!",
            key: "updatable",
          });
          setState((prevState) => ({ ...prevState, loading: false }));
        }
      });
    },
    // handleTagEnter: ({ state: { tags }, setState }) => (input) => (event) => {
    //   event.preventDefault();
    //   const tagName = (input.current.state.value).replace(/(#|@)/gi, '').trim();
    //   if (!tagName) return;
    //   const tagExist = tags.find(({ tag }) => tag === tagName);
    //   if (!tagExist) {
    //     setState((prevState) => ({
    //       ...prevState,
    //       tags: [...tags, { tag: tagName, color: genRandColor() }],
    //     }));
    //   }
    //   input.current.handleReset();
    // },

    handleTagEnter: () => (input, tagList) => (event) => {
      event.preventDefault();
      const tagName = input.current.state.value.replace(/(#|@)/gi, "").trim();
      if (!tagName) return;
      const tagExist = tagList.current.find(({ tag }) => tag === tagName);
      if (!tagExist) {
        const newList = [
          ...tagList.current,
          { tag: tagName, color: genRandColor() },
        ];
        tagList.current = newList;
      }
      input.current.handleReset();
    },

    // handleRemoveTag: ({ setState, state: { tags } }) => (item) => () => {
    // const index = tags.findIndex(({ tag }) => tag === item);
    // FIRST ATTEMPT
    // const tagList = tags.slice();
    // tagList.splice(index, 1);
    // console.log({ tags, tagList }, index)

    // SECOND ATTEMPT
    // const front = tags.slice(0, index);
    // const back = tags.slice(index+1);
    // console.log({ tags, front, back });
    //   setState((prevState) => ({ ...prevState, tags: tagList }));
    // },

    handleRemoveTag: () => (item, tagList) => () => {
      const index = tagList.findIndex(({ tag }) => tag === item);
      const list = tagList.slice();
      list.splice(index, 1);
      tagList = list;
    },
  })
)(Component);
