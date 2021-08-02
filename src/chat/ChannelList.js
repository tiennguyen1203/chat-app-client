import React from 'react';
import { Channel } from './Channel';

export class ChannelList extends React.Component {
  handleClick = (id) => {
    this.props.onSelectChannel(id);
  };

  render() {
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
