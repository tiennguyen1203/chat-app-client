import { withAuthenticator } from '@aws-amplify/ui-react';
import React from 'react';
import socketClient from 'socket.io-client';
import { get } from '../common/request-utils';
import { ChannelList } from './ChannelList';
import './chat.scss';
import { MessagesPanel } from './MessagesPanel';
const SERVER = 'http://127.0.0.1:80';
export class A extends React.Component {
  constructor() {
    super();
    this.isAuthenticated = localStorage.getItem('token');
  }
  state = {
    channels: null,
    socket: null,
    channel: null,
  };
  socket;
  componentDidMount() {
    this.loadChannels();
    this.configureSocket();
  }

  configureSocket = () => {
    var socket = socketClient(SERVER, { transports: ['websocket'] });
    socket.on('connection', () => {
      if (this.state.channel) {
        this.handleChannelSelect(this.state.channel.id);
      }
    });
    socket.on('channel', (channel) => {
      console.log('11111', channel);
      let channels = this.state.channels;
      channels.forEach((c) => {
        if (c._id === channel._id) {
          c.participants = channel.participants;
        }
      });
      this.setState({ channels });
    });
    socket.on('message', (message) => {
      console.log('dadsadsad', message);
      let channels = this.state.channels;
      channels &&
        channels.forEach((c) => {
          if (c._id === message.channel_id) {
            if (!c.messages) {
              c.messages = [message];
            } else {
              c.messages.push(message);
            }
          }
        });
      this.setState({ channels });
    });
    this.socket = socket;
  };

  loadChannels = async () => {
    const response = await get('http://localhost:8080/channels');
    console.log('response: ', response, typeof response);
    this.setState({ channels: response.channels });
  };

  handleChannelSelect = (id) => {
    let channel = this.state.channels.find((c) => {
      return c._id === id;
    });
    this.setState({ channel });
    console.log('is here ?', id);
    this.socket.emit('channel-join', id, (ack) => {});
  };

  handleSendMessage = (channel_id, text) => {
    this.socket.emit('send-message', {
      channel_id,
      text,
      senderName: this.socket.id,
      id: Date.now(),
    });
  };

  render() {
    return (
      <div className='chat-app'>
        <ChannelList
          channels={this.state.channels}
          onSelectChannel={this.handleChannelSelect}
        />
        <MessagesPanel
          onSendMessage={this.handleSendMessage}
          channel={this.state.channel}
        />
      </div>
    );
  }
}

export default withAuthenticator(A);
