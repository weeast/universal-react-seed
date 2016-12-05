import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadQuestions } from 'APP/actions/questions'
import { Link } from 'react-router'
import _ from 'lodash'
import Questions from 'APP/components/Questions'

class QuestionContainer extends Component {
  static fetchData({ store }) {
    return store.dispatch(loadQuestions())
  }

  componentDidMount() {
    this.props.loadQuestions()
  }
  render() {
    return (
      <div>
        <h2>Question</h2>
        <Questions questions={this.props.questions} />
        <Link to="/">Back to Hoasdasda</Link>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { questions: state.questions }
}

export default connect(mapStateToProps, { loadQuestions })(QuestionContainer)
