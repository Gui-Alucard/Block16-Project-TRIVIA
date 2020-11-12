import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { answerAction } from '../actions';

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.decreaseTime = this.decreaseTime.bind(this);

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
    const { answered } = this.props;
    const oneSecond = 1000;
    if (timeLeft > 0 && answered === false) setTimeout(this.decreaseTime, oneSecond);
    // const action = {
    //   time: 30,
    //   answered: true,
    //   timeout: true,
    // };
    // if (timeLeft < 1) answeredAction(action);
    // Preciso de uma forma de dar esse dispatch uma unica vez e não dispará-lo
  }

  componentWillUnmount() {
    const { timeLeft } = this.state;
    if (timeLeft < 1) console.log('desmontou');
  }

  decreaseTime() {
    const { timeLeft } = this.state;
    const { answered } = this.props;
    if (timeLeft > 0) this.setState({ timeLeft: timeLeft - 1 });
    if (answered === true) this.setState({ timeLeft: 30 }); // responsável por resetar o timer
  }

  render() {
    const { timeLeft } = this.state;
    return (
      <h4>
        Tempo:
        {' '}
        { timeLeft }
      </h4>
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
