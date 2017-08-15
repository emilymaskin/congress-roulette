/* global ga */

import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import '../css/App.css';
import { recipients } from '../recipients';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipient: null,
    };
  }

  spinWheel = () => {
    const recipient = this.getRandomRecipient();

    if (
      recipient
      && this.state.recipient
      && recipient.name === this.state.recipient.name
    ) {
      this.spinWheel();
    }
    ga('send', 'event', 'wheel', 'spin');

    this.setState({
      recipient,
    });
  };

  onClickDonate = () => {
    ga('send', 'event', 'donateButton', 'click');
  };

  getRandomRecipient() {
    const randomIndex = Math.floor(Math.random() * recipients.length);

    return recipients[randomIndex];
  }

  render() {
    return (
      <div className="App">
        <div className={css(styles.wrapper)}>
          {this.state.recipient
            ? <div>
                <h1 className={css(styles.h1)}>You should donate to:</h1>
                <h2 className={css(styles.h2)}>
                  {this.state.recipient.name}
                </h2>
                <div>
                  <a
                    href={this.state.recipient.url}
                    target="_blank"
                    className={css(styles.button)}
                    onClick={this.onClickDonate}
                  >
                    Donate here
                  </a>
                </div>
                <div onClick={this.spinWheel} className={css(styles.spinAgain)}>
                  Spin again
                </div>
              </div>
            : <div>
                <h2 className={css(styles.h2)}>
                  Looking to help out in the wake of the Charlottesville
                  attacks, but not sure where to send your money?
                </h2>
                <div onClick={this.spinWheel} className={css(styles.button)}>
                  Spin the wheel
                </div>
              </div>}
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    textAlign: 'center',
    padding: 100,
    maxWidth: 700,
    margin: '0 auto',
  },
  h1: {
    marginBottom: 40,
    fontWeight: 400,
  },
  h2: {
    marginBottom: 40,
    fontWeight: 400,
    lineHeight: 1.5,
  },
  button: {
    background: '#6D8B9C',
    padding: '30px 40px',
    borderRadius: 10,
    display: 'inline-block',
    cursor: 'pointer',
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    userSelect: 'none',
    textDecoration: 'none',
    marginBottom: 20,
    color: '#fff',
    fontSize: 30,
    fontWeight: 200,
    ':hover': {
      background: '#202C39',
    },
  },
  spinAgain: {
    textDecoration: 'underline',
    color: '#000000',
    cursor: 'pointer',
    opacity: '0.5',
    ':hover': {
      opacity: '0.7',
    },
  },
});
