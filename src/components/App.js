/* global ga */

import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import '../css/App.css';
import { recipients } from '../recipients';
import RecipientList from './RecipientList';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipient: null,
      currentPage: 'landing',
    };
  }

  spinWheel = () => {
    const recipient = this.getRandomRecipient();

    if (
      recipient &&
      this.state.recipient &&
      recipient.name === this.state.recipient.name
    ) {
      this.spinWheel();
    }
    ga('send', 'event', 'wheel', 'spin');

    this.setState({
      recipient,
    });
  };

  viewList = () => {
    this.setState({
      currentPage: 'list',
    });
  };

  onClickDonate = () => {
    ga('send', 'event', 'donateButton', 'click');
  };

  getRandomRecipient() {
    const randomIndex = Math.floor(Math.random() * recipients.length);

    return recipients[randomIndex];
  }

  onClickGoBack = () => {
    this.setState({
      currentPage: 'landing',
    });
  };

  render() {
    return (
      <div className="App">
        <div className={css(styles.wrapper)}>
          <h1 className={css(styles.h1)}>
            <div>Donate</div>
            <div>Charlottesville</div>
          </h1>
          {this.state.currentPage === 'list'
            ? <RecipientList onClickGoBack={this.onClickGoBack} />
            : <div>
                <div className={css(styles.divider)} />
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
                      <div
                        onClick={this.spinWheel}
                        className={css(styles.spinAgain)}
                      >
                        Spin again
                      </div>
                    </div>
                  : <div>
                      <h2 className={css(styles.h2)}>
                        Looking to help out in the wake of the attacks, but not
                        sure where to send your money?
                      </h2>
                      <div
                        onClick={this.spinWheel}
                        className={css(styles.button)}
                      >
                        Spin the wheel
                      </div>
                      <div
                        onClick={this.viewList}
                        className={css(styles.spinAgain)}
                      >
                        View all
                      </div>
                    </div>}
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
    margin: '0 auto',
    '@media screen and (max-width: 500px)': {
      padding: 20,
    },
  },
  divider: {
    height: 6,
    width: 400,
    background: '#fff',
    margin: '40px auto',
    maxWidth: '90%',
  },
  h1: {
    fontSize: 100,
    lineHeight: 1,
    fontWeight: 900,
    fontFamily:
      "'franklin-gothic-urw', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    '@media screen and (max-width: 500px)': {
      fontSize: 44,
      lineHeight: 1.2,
      marginBottom: 50,
    },
    '@media screen and (max-width: 350px)': {
      fontSize: 36,
      lineHeight: 1.2,
    },
  },
  h2: {
    fontWeight: 300,
    lineHeight: 1.5,
    maxWidth: 560,
    margin: '0 auto 40px',
  },
  h3: {
    marginBottom: 40,
    fontWeight: 600,
    fontSize: 24,
    lineHeight: 1.3,
    color: '#3DB0FD',
    maxWidth: 600,
    margin: '0 auto 40px',
    transition: '0.3s ease-out',
  },
  button: {
    background: '#000',
    border: '4px solid #fff',
    padding: '25px 50px',
    display: 'inline-block',
    cursor: 'pointer',
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    userSelect: 'none',
    textDecoration: 'none',
    marginBottom: 40,
    fontSize: 30,
    fontWeight: 500,
    textTransform: 'uppercase',
    transition: '0.3s ease-out',
    ':hover': {
      color: '#000',
      background: '#fff',
      transition: '0.2s ease-out',
    },
    '@media screen and (max-width: 500px)': {
      fontSize: 20,
      lineHeight: 1.2,
      padding: '12px 24px',
      margin: '20px auto',
    },
  },
  spinAgain: {
    color: '#aaa',
    cursor: 'pointer',
    fontSize: 24,
    fontWeight: 300,
    ':hover': {
      color: '#ccc',
    },
  },
});
