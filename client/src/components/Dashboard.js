import React from "react";
import { Link } from "react-router-dom";
import CampaignList from "./campaigns/CampaignList";

const Dashboard = () => {
	return (
		<div>
			<CampaignList />
		    <div className="fixed-action-btn">
		  	  <Link to="/campaigns/new" className="btn-floating btn-large red">
		    	 <i className="material-icons">add</i>
		      </Link>
		    </div>
		</div>
	);
};

export default Dashboard;