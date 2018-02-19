//show users their form inputs for review
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import formFields from "./formFields";
import * as actions from "../../actions";

const CampaignReview = ({ onCancel, formValues, submitCampaign, history }) => {
	const reviewFields = _.map(formFields, ({ name, label }) => {
		return (
			<div key={name}>
				<label>{label}</label>
				<div>
					{formValues[name]}
				</div>
			</div>
		);
	});

	return (
		<div className="container" style={{ marginTop: "20px"  }}>
			<h5>Please confirm your inputs</h5>
			{reviewFields}
			<button 
				style={{ marginTop: "20px" }}
				className="yellow darken-3 white-text btn"
				onClick={onCancel}
			>
				Back
			</button>
			<button
			 	style={{ marginTop: "20px" }}
				onClick={() => submitCampaign(formValues, history)}
				className="greeen btn right"
			>
				Send Campaign
				<i className="material-icons right">email</i>
			</button>
		</div>
	);
}

function mapStateToProps(state) {
	return { formValues: state.form.campaignForm.values	};
}

export default connect(mapStateToProps, actions)(withRouter(CampaignReview));