//shows a form for a user to add input
import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import CampaignField from "./CampaignField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";


class CampaignForm extends Component {
	renderFields() {
		return _.map(formFields, ({ label, name }) => {
			return (
				<Field 
					key={name}
				 	component={CampaignField}
				 	type="text"
				 	label={label}
				 	name={name} 
				/>
			);
		});
	};

	render() {
		return (
			<div className="container" style={{ marginTop: "20px"}}>
				<form onSubmit={this.props.handleSubmit(this.props.onCampaignSubmit)}>
					{this.renderFields()}
					<Link to="/campaigns" className="red btn white-text">
						Cancel
					</Link>
					 <button className="btn waves-effect waves-light right" type="submit">
					 	Next
					 	<i className="material-icons right">arrow_forward</i>
					 </button>
					</form>
			</div>
		);

	}
}

function validate(values) {
	const errors = {};

	errors.recipients = validateEmails(values.recipients || "");

	_.each(formFields, ({ name, noValueError }) => {
		if (!values[name]) {
			errors[name] = noValueError;
		}
	});

	return errors;
}

export default reduxForm({
	validate,
	form: "campaignForm",
	destroyOnUnmount: false
})(CampaignForm);