import { registerComponent, Components } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import { intlShape } from 'react-intl';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import { withRouter, Link } from 'react-router';
import PropTypes from 'prop-types';

import { addAction, addReducer, getActions } from 'meteor/vulcan:lib';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

addAction({
  searchBg: {
    setBackground(bgColor) {
      return {
        type: "SET_BACKGROUND",
        bgColor,
      }
    }
  }
});

addReducer({
  searchBg: (state = "#fff", action) => {
    switch(action.type) {
      case "SET_BACKGROUND":
        return action.bgColor
      default: 
        return state;
    }
  },
});

const Input = FRC.Input;

// see: http://stackoverflow.com/questions/1909441/jquery-keyup-delay
const delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

class Search extends Component{

  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.state = {
      search: props.router.location.query.query || ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      search: this.props.router.location.query.query || ''
    });
  }

  search(data) {

    const router = this.props.router;
    const routerQuery = _.clone(router.location.query);
    delete routerQuery.query;

    const query = data.searchQuery === '' ? routerQuery : {...routerQuery, query:data.searchQuery}; 

    delay(() => {
      router.push({pathname: "/search", query: query});
    }, 700 );

  }

  render() {
    const resetQuery = _.clone(this.props.location.query);
    delete resetQuery.query;

    const { setBackground, searchBg } = this.props;
    return (
      <div className="search-form" style={{padding: "100px"}}>
        <Formsy.Form onChange={this.search}>
          <Input
            name="searchQuery"
            value={this.state.search}
            placeholder={this.context.intl.formatMessage({id: "posts.search"})}
            type="text"
            layout="elementOnly"
            onFocus={() => setBackground("#000")}
            onBlur={() => setBackground("#fff")}
          />
          {this.state.search !== '' ? <Link className="search-form-reset" to={{pathname: '/', query: resetQuery}}><Components.Icon name="close" /></Link> : null}
        </Formsy.Form>
      </div>
    )
  }
}

Search.contextTypes = {
  intl: intlShape
};

Search.propTypes = {
  setBackground: PropTypes.func.isRequired,
  searchBg: PropTypes.string.isRequired
}


const mapStateToProps = state => ({ searchBg: state.searchBg, });
const mapDispatchToProps = dispatch => bindActionCreators(getActions().searchBg, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
