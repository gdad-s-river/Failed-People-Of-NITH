import { withMessages } from "meteor/vulcan:core";
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withFlag, hasFlagged } from "meteor/nith:peeps-flagging";
import { /*FormattedMessage,*/ intlShape } from "meteor/vulcan:i18n";

class UsersFlag extends PureComponent {
	flagHandler = e => {
		const { userToFlagDoc, flagAction, currentUser } = this.props;
		e.preventDefault();
		// console.log({ userToFlagDoc, flagAction, currentUser });
		this.props.flag({ userToFlagDoc, flagAction, currentUser });
	};

	render() {
		return <button onClick={this.flagHandler}>Flag</button>;
	}
}

export default withFlag(withMessages(UsersFlag));
