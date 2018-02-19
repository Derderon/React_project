import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCampaigns } from "../../actions";

class CampaignList extends Component {
	componentDidMount() {
		this.props.fetchCampaigns();
	}

	renderCampaigns() {
		return this.props.campaigns.reverse().map(campaign => {
			return (
			  <div className="row">
		        <div className="col s12 m12 l12">
		          <div className="card blue-grey darken-1" key={campaign._id}>
		            <div className="card-content white-text">
		              <span className="card-title">{campaign.title}</span>
		              <p>{campaign.body}</p>
		              <p className="right">Sent on: {new Date(campaign.dateSent).toLocaleDateString()}</p>
		            </div>
		            <div className="card-action">
		              <a className="">Yes: {campaign.yes}</a>
		              <a>No: {campaign.no}</a>
		              <p className="right white-text">Last respond: {new Date(campaign.lastResponded).toLocaleDateString()}</p>
		            </div>
		          </div>
		        </div>
		      </div>
		    );
		});
	};

	render() {
		return (
			<div>
				 {this.renderCampaigns()}
			</div>
		);
	}
}

function mapStateToProps({ campaigns }) {
	return { campaigns };
};

export default connect(mapStateToProps, { fetchCampaigns })(CampaignList);