import { Form, message } from 'antd';
import { compose, withState, withHandlers } from 'recompose';
import { Profile } from '.';
import { ComponentFromStreamWrapper } from '../../Reuseables/Wrapper';
import { getBase64 } from '../../../helpers'

const Component = ComponentFromStreamWrapper(Profile);

export const ProfileWrapper = compose(
  Form.create({ name: "account" }),
  withState("state", "setState", { loading: false, imageUrl: undefined }),
  withHandlers({
    handleSubmit: ({ form }) => (event) => {
      event.preventDefault();
      form.validateFields((err, values) => {
        if (!err) {
          console.log('Received these values ', values);
        } else {
          console.log(err);
        }
      });
    },
    handleFileChange: ({ setState }) => ({ file }) => {
      if (file.status === 'uploading') {
        setState({ loading: true });
        return;
      }
      if (file.status === 'done') {
        getBase64(file.originFileObj, imageUrl =>
          setState({
            imageUrl,
            loading: false,
          }),
        );
      }
    },
    handleBeforeUpload: () => (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
  })
)(Component);
