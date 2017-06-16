import { withMessages } from "meteor/vulcan:core";
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withFlag, hasFlagged } from "meteor/nith:peeps-flagging";
import { /*FormattedMessage,*/ intlShape } from "meteor/vulcan:i18n";
import glamorous from "glamorous";

const FlagContainer = glamorous.div({
	borderTop: "2px solid black",
	padding: "10px 0",
});

const FlagButton = glamorous.button({
	padding: "10px",
	border: "none",
	color: "white",
	background: "red",
	margin: "0 10px",
	cursor: "pointer",
});

class UsersFlag extends PureComponent {
	flagHandler = e => {
		const { userToFlagDoc, flagAction, currentUser } = this.props;
		e.preventDefault();
		// console.log({ userToFlagDoc, flagAction, currentUser });
		this.props.flag({ userToFlagDoc, flagAction, currentUser });
	};

	render() {
		const { userToFlagDoc, flagAction, currentUser } = this.props;

		return (
			<FlagContainer>
				{userToFlagDoc.flagVotes
					? <span
							style={{ marginBottom: "10px", display: "inline-block" }}
						>{`This User Has Been Flagged ${userToFlagDoc.flagVotes} Times`}</span>
					: null}

				{_.findWhere(userToFlagDoc.flagVoters, { _id: currentUser._id })
					? <div style={{ padding: "10px 0" }}>You've flagged this user</div>
					: <div>
							<span>Not an NITian?</span>
							<FlagButton onClick={this.flagHandler}>
								Flag This Person
							</FlagButton>
						</div>}

			</FlagContainer>
		);
	}
}

export default withFlag(withMessages(UsersFlag));
