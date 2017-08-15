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
          <h1 className={css(styles.h1)}>
            <div>Donate</div>
            <div className={css(styles.script)}>Charlottesville</div>
          </h1>
          {this.state.recipient
            ? <div>
                <h2 className={css(styles.h2)}>You should donate to:</h2>
                <h3 className={css(styles.h3)}>
                  {this.state.recipient.name}
                </h3>
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
                  Looking to help out in the wake of the attacks, but not sure
                  where to send your money?
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
    padding: 40,
    maxWidth: 600,
    margin: '0 auto',
  },
  h1: {
    fontWeight: 400,
    fontSize: 50,
    lineHeight: 1,
    marginBottom: 100,
  },
  script: {
    fontFamily: "'Dancing Script', cursive",
    fontSize: 100,
  },
  h2: {
    fontWeight: 400,
    lineHeight: 1.5,
  },
  h3: {
    marginBottom: 40,
    fontWeight: 400,
    fontSize: 24,
    lineHeight: 1.3,
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
    margin: 40,
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
