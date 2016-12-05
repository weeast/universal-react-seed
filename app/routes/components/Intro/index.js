import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import imgHead from 'APP/assets/images/head.png'

import "./index.less"

class Intro extends Component {
  render() {
    return (
      <div className="intro">
        <h1>Intro</h1>
        <div>
          <img src={imgHead} />
        </div>
        <Link to="/questions">to questions</Link>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export { Intro }
export default connect(mapStateToProps)(Intro);
