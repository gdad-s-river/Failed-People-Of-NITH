import { Components, ModalTrigger } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import Users from "meteor/vulcan:users";
import UsersAvatar from './UsersAvatar'
import glamorous from 'glamorous';

const StyledUserDetails = glamorous.span({
  position: "relative",
  top: "-8px",
  padding: "12px"
})

class UsersItem extends Component {

  // renderCategories() {
  //   return this.props.post.categories && this.props.post.categories.length > 0 ? <Components.PostsCategories post={this.props.post} /> : "";
  // }

  // renderCommenters() {
  //   return this.props.post.commenters && this.props.post.commenters.length > 0 ? <Components.PostsCommenters post={this.props.post}/> : "";
  // }

  // renderActions() {
  //   return (
  //     <div className="posts-actions">
  //       <ModalTrigger title="Edit Post" component={<a className="posts-action-edit"><FormattedMessage id="posts.edit"/></a>}>
  //         <Components.PostsEditForm post={this.props.post} />
  //       </ModalTrigger>
  //     </div>
  //   )
  // }

  render() {

    const {user} = this.props;

    let userClass = "users-item";
    if (user.sticky) userClass += " users-sticky";

    return (
      <div className={userClass} style={{
        padding: "10px",
        background: "#d2eff3",
        margin: "0 0 3px",
        color: "#212121",
        borderRadius: "25px"
      }}>

        {/* <div className="posts-item-vote">
          <Components.Vote collection={Posts} document={post} currentUser={this.props.currentUser}/>
        </div> */}

        {/* {post.thumbnailUrl ? <Components.PostsThumbnail post={post}/> : null} */}

        <div className="posts-item-content">
          <UsersAvatar size="medium" user={user} link={false} imgStyles={{
            display: "inline-block"
          }}/>
          <StyledUserDetails>
          {user.displayName} {user.rollNoOrRegNo} {user.branch} {user.graduatingUser} {user.currentOccupation}
          </StyledUserDetails>

{/*
          <h3 className="posts-item-title">
            <Link to={Posts.getLink(post)} className="posts-item-title-link" target={Posts.getLinkTarget(post)}>
              {post.title}
            </Link>
            {this.renderCategories()}
          </h3>

          <div className="posts-item-meta">
            {post.user? <div className="posts-item-user"><Components.UsersAvatar user={post.user} size="small"/><Components.UsersName user={post.user}/></div> : null}
            <div className="posts-item-date">{post.postedAt ? <FormattedRelative value={post.postedAt}/> : <FormattedMessage id="posts.dateNotDefined"/>}</div>
            <div className="posts-item-comments">
              <Link to={Posts.getPageUrl(post)}>
                <FormattedMessage id="comments.count" values={{count: post.commentCount}}/>
              </Link>
            </div>
            {this.props.currentUser && this.props.currentUser.isAdmin ? <Components.PostsStats post={post} /> : null}
            {Posts.options.mutations.edit.check(this.props.currentUser, post) ? this.renderActions() : null}
          </div> */}

        </div>

        {/* {this.renderCommenters()} */}

      </div>
    )
  }
}

UsersItem.propTypes = {
  currentUser: React.PropTypes.object,
  // post: React.PropTypes.object.isRequired,
  terms: React.PropTypes.object,
};

export default UsersItem;
