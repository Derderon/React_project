const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const campaignTemplate = require("../services/emailTemplates/campaignTemplate");

const Campaign = mongoose.model("campaigns");

module.exports = app => {
	app.get("/api/campaigns", requireLogin, async (req, res) => {
		const campaigns = await Campaign.find({ _user: req.user.id })
			.select({ recipients: false });
		res.send(campaigns);
	});

	app.get("/api/campaigns/:campaignId/:choice", (req, res) => {
		<div className="card blue-grey darken-1">
			<div className="card-content white-text">
			<span className="card-title center">res.send("Thank you for your feedback!");</span>
			</div>
		</div>
	});

	app.post("/api/campaigns/webhooks", (req, res) => {
		const p = new Path("/api/campaigns/:campaignId/:choice");
		const events = _.chain(req.body)
			.map(({ email, url }) => {
				const match = p.test(new URL(url).pathname);
				if (match) {
					return { email, campaignId: match.campaignId, choice: match.choice };
				}
			})
			.compact()
			.uniqBy("email", "campaignId")
			.each(({ campaignId, email, choice }) => {
				Campaign.updateOne({
					_id: campaignId,
					recipients: {
						$elemMatch: { email: email, responded: false }
					}
				}, {
					$inc: { [choice]: 1 },
					$set: { "recepients.$.responded": true },
					lastResponded: new Date()
				}).exec();
			})
			.value();
		res.send({});
	});

	app.post("/api/campaigns", requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body;
		const campaign = new Campaign({
			title,
			subject,
			body,
			recipients: recipients.split(',').map(email => ({ email: email.trim() })),
			_user: req.user.id,
			dateSent: Date.now()
		});

		// Place to send an email
		const mailer = new Mailer(campaign, campaignTemplate(campaign));
		
		try {
			await mailer.send();
			await campaign.save();
			req.user.credits -= 1;
			const user = await req.user.save();
			res.send(user)
		} catch (err) {
			res.status(422).send(err);
		}
	});
};