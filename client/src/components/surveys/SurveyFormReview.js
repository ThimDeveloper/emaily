// Show user their form input
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from './../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = _.map(formFields, ({ name, label }) => (
    <div key={name}>
      <label>{label}</label>
      <div>{formValues[name]}</div>
    </div>
  ));
  return (
    <div>
      <h5>Please review your answers.</h5>
      <div>{reviewFields}</div>
      <button
        onClick={onCancel}
        className="yellow darken-3 white-text btn-flat left"
      >
        Back
        <i className="material-icons right">arrow_back</i>
      </button>
      <button
        // History object allows us to navigate front end application from actions creators.
        onClick={() => submitSurvey(formValues, history)}
        className="teal white-text btn-flat right"
      >
        Send Survey
        <i className="material-icons right">send</i>
      </button>
    </div>
  );
};

const mapStateToProps = ({
  form: {
    surveyForm: { values }
  }
}) => {
  return { formValues: values };
};

export default connect(
  mapStateToProps,
  actions
)(withRouter(SurveyFormReview));
