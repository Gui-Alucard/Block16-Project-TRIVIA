import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { answerAction } from '../actions';

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.decreaseTime = this.decreaseTime.bind(this);
    this.restei = this.restei.bind(this);

    const { time } = this.props;
    this.state = {
      timeLeft: time,
    };
  }

  componentDidMount() {
    const oneSecond = 1000;
    setTimeout(this.decreaseTime, oneSecond);
  }

  componentDidUpdate() {
    const { timeLeft } = this.state;
    const { answered, testeReset } = this.props;
    const oneSecond = 1000;
    if (timeLeft > 0 && answered === false) setTimeout(this.decreaseTime, oneSecond);
    if (testeReset === true) this.restei();
  }

  componentWillUnmount() {
    const { timeLeft } = this.state;
    if (timeLeft < 1) this.setState({ timeLeft: 30 });
  }

  decreaseTime() {
    const { timeLeft } = this.state;
    const { answeredAction, answered } = this.props;
    if (timeLeft > 0) this.setState(({ timeLeft: timeLeft - 1 }), () => {
      const { timeLeft } = this.state;
      const action = {
        time: timeLeft,
        answered: true,
        timeout: true,
        testeReset: true,
      };
      if (timeLeft < 1 || answered === true) answeredAction(action);
    });
  }

  restei() {
    const { timeLeft } = this.state;
    this.setState(({ timeLeft: 30 }), () => {
      const { testeReset, answeredAction } = this.props;
      const action = {
        time: timeLeft,
        answered: true,
        timeout: true,
        testeReset: false,
      };
      if (testeReset === true) answeredAction(action);
    });
  }

  render() {
    const { timeLeft } = this.state;
    return (
      <section className="timer-container">
        <section className="timer-back" />
        <p className="timer-number">
        { timeLeft }
        </p>
      </section>
    );
  }
}

Timer.defaultProps = {
  answered: false,
  time: 30,
};

Timer.propTypes = {
  answered: propTypes.bool.isRequired,
  time: propTypes.number.isRequired,
  answeredAction: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  answeredAction: (answerTime) => dispatch(answerAction(answerTime)),
});

function mapStateToProps(state) {
  return {
    name: state.login.name,
    score: state.allQuestions.score,
    answered: state.allQuestions.answered,
    time: state.allQuestions.time,
    testeReset: state.allQuestions.testeReset,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
