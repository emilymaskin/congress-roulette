import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import '../css/App.css';
import { recipients } from '../recipients';

export default class RecipientList extends React.Component {
  render() {
    return (
      <div>
        <div className={css(styles.list)}>
          {recipients.map(r =>
            <a href={r.url} target="_blank" className={css(styles.a)}>
              {r.name}
            </a>,
          )}
        </div>
        <div onClick={this.goBack} className={css(styles.goBack)}>
          Go back
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    listStyle: 'none',
    textAlign: 'left',
    maxWidth: 800,
    margin: '0 auto 20px',
  },
  a: {
    color: '#ddd',
    textDecoration: 'none',
    marginBottom: 20,
    display: 'block',
    ':hover': {
      color: '#fff',
    },
  },
  goBack: {
    color: '#aaa',
    cursor: 'pointer',
    fontSize: 24,
    fontWeight: 300,
    ':hover': {
      color: '#ccc',
    },
  },
});
