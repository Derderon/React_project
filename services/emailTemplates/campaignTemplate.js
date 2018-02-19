const keys = require("../../config/keys");

module.exports = campaign => {
	return `
		<html>
			<body>
				<div style="text-align: center;">
					<h3>I would like to know your input</h3>
					<p>Please answer the following question:</p>
					<p>${campaign.body}</p>
					<div>
						<a href="${keys.redirectDomain}/api/campaigns/${campaign.id}/yes">Yes</a>
					</div>
					<div>
						<a href="${keys.redirectDomain}/api/campaigns/${campaign.id}/no">No</a>
					</div>
				</div>
			</body>
		</html>

	`;
};