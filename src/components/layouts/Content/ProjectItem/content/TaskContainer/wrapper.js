import { message } from 'antd'
import { ComponentFromStreamWrapper } from "../../../../../Reuseables/Wrapper";
import { TaskContainer } from "./TaskContainer";
import { compose, withState, withHandlers } from "recompose";
import { withFirestore } from "react-redux-firebase";
import { generateUniqueId } from "../../../../../../helpers";

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
        const newTask = {
          id: generateUniqueId(15),
          title,
          stage,
          project_id,
          userId: uid,
          creator_id: uid,
          deleted: false,
          archived: false,
          assignee: [
            {
              img_url: photoURL,
              name: user_name,
            },
          ],
          created_on: (new Date().getTime()),
        };        
        setPopover(false);
        return firestore
          .add({ collection: 'tasks' }, newTask)
          .then(() => message.success('New task created successfully.'))
          .catch(err => message.error(err.message));
      }
    },
  })
)(Component);
