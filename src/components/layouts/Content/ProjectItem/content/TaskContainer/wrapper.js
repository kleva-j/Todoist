import { message } from 'antd'
import { withFirestore } from "react-redux-firebase";
import { compose, withState, withHandlers } from "recompose";

import { TaskContainer } from "./TaskContainer";
import { FirebaseApp } from '../../../../../../services';
import { generateUniqueId } from "../../../../../../helpers";
import { ComponentFromStreamWrapper } from "../../../../../Reuseables/Wrapper";

const Component = ComponentFromStreamWrapper(TaskContainer);

export const TaskContainerWrapper = compose(
  withFirestore,
  withState("state", "setState", { isPopoverVisible: false }),
  withHandlers({
    setPopover: ({ state, setState }) => (visibility) => {
      setState({ ...state, isPopoverVisible: visibility });
    },
  }),
  withHandlers({
    handleOnEnter: ({
      setPopover,
      firestore,
      user: { uid, photoURL, user_name },
      project: { id: project_id }
    }) => ({ title, stage }) => {
      if (title) {
        const creator = {
          img_url: photoURL,
          uid,
          name: user_name,
        };
        const newTask = {
          id: generateUniqueId(15),
          title,
          stage,
          creator,
          project_id,
          assignee: [ creator ],
          created_on: (new Date().getTime()),
        };        
        setPopover(false);
        return firestore
          .add({ collection: 'tasks' }, newTask)
          .then(_ => {
            FirebaseApp.analytics.logEvent('create_task', { title, stage });
          })
          .catch(err => message.error(err.message));
      }
    },
  })
)(Component);
