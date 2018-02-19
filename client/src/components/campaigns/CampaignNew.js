//shows new campaign and campaign reviews
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import CampaignForm from "./CampaignForm";
import CampaignFormReview from "./CampaignFormReview";

class CampaignNew extends Component {
	state = { showFormReview: false };

	renderContent() {
		if (this.state.showFormReview) {
			return (
				<CampaignFormReview
					onCancel={() => this.setState({ showFormReview: false })}
				 />
			);
		}
		return (
			<CampaignForm
				onCampaignSubmit={() => this.setState({ showFormReview: true })}
			/>
		);
	}

	render() {
		return (
			<div>
				{this.renderContent()}
			</div>
		);

	}
}

export default reduxForm({
	form: "campaignForm"
})(CampaignNew);