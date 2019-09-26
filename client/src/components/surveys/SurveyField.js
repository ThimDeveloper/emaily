// SurveyField contains logic to render a single label and text input
import React from 'react';

const SurveyField = ({ input, label, meta: { error, touched } }) => {
  console.log(error);
  console.log(touched);
  return (
    <div>
      <label>{label}</label>
      <input style={{ marginBottom: '5px' }} {...input} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};

export default SurveyField;
