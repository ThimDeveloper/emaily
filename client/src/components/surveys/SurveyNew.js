// SurveyNew shows SurveyForm and SurveyReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
  state = {
    showFormReview: false
  };

  renderContent() {
    if (this.state.showFormReview)
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    else
      return (
        <SurveyForm
          onSurveySubmit={() => this.setState({ showFormReview: true })}
        />
      );
  }
  render() {
    console.log(this.state.showReview);
    return <div>{this.renderContent()}</div>;
  }
}

// This creates a new initialization of surveyForm (If this component is unmounted, dump all values in the form: 'surveyForm')
export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
