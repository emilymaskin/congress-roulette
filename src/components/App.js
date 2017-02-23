import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import '../css/App.css';
import { candidates } from '../candidates';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      candidate: null,
    };
  }

  spinWheel = () => {
    const candidate = this.getRandomCandidate();

    if (candidate && this.state.candidate && (
      candidate.district === this.state.candidate.district)
    ) {
      this.spinWheel();
    }

    this.setState({
      candidate,
    });
  }

  getRandomCandidate() {
    const randomIndex = Math.floor(Math.random() * candidates.length);

    return candidates[randomIndex];
  }

  render() {
    return (
      <div className="App">
        <div className={css(styles.wrapper)}>
          {this.state.candidate ? (
            <div>
              <h1>You should donate to:</h1>
              <div>
                <a href={this.state.candidate.url} target="_blank">
                  {this.state.candidate.name}, {this.state.candidate.district}
                </a>
              </div>
              <div onClick={this.spinWheel} className={css(styles.button)}>
                Spin again
              </div>
            </div>
          ) : (
            <div>
              <div>
                Looking to contribute to a race outside your safely blue
                bubble? Find a Democratic candidate here.
              </div>
              <div onClick={this.spinWheel} className={css(styles.button)}>
                Spin the wheel
              </div>
            </div>
          ) }
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    textAlign: 'center',
    padding: 100,
  },
  button: {
    background: '#ddd',
    padding: '10px 20px',
    borderRadius: 5,
    display: 'inline-block',
    margin: '20px auto 100px',
    cursor: 'pointer',
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    userSelect: 'none',
    ':hover': {
      background: '#ccc',
    },
  },
});
