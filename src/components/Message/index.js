/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import Toast from 'react-native-root-toast';
import type { Message as Props } from '../../redux/modules/messages/reducer';


// TODO: Doesn't work. Why?
const Message = ({ show, text }: Props) => (
  <Toast
    visible={show}
    position={20}
    shadow={false}
    animation={false}
    hideOnPress
  >
    {text}
  </Toast>
);

const mapStateToProps = state => state.messages;

export default connect(mapStateToProps)(Message);
