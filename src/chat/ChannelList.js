import Auth from '@aws-amplify/auth';
import React from 'react';
import { Channel } from './Channel';

export class ChannelList extends React.Component {
  handleClick = (id) => {
    this.props.onSelectChannel(id);
  };

  // global.console.log(object)

  render() {
    // console.log('huhuhuhuhu')
    Auth.currentSession().then((value) =>
      console.log('12123123123231:', value.getIdToken().getJwtToken())
    );
    let list = (
      <div className='no-content-message'>There is no channels to show</div>
    );
    console.log(this.props);
    if (this.props.channels && this.props.channels.map) {
      list = this.props.channels.map((c) => (
        <Channel
          key={c._id}
          id={c._id}
          name={c.name}
          participants={c.participants}
          onClick={this.handleClick}
        />
      ));
    }
    return <div className='channel-list'>{list}</div>;
  }
}
