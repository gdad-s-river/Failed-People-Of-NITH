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

import glamorous from 'glamorous';
import Helmet from 'react-helmet';

import mediaQueries from '../modules/media-queries.js';

const  defaultSearchBg = "linear-gradient(to left, #2c3e50, #4ca1af)";
const  onFocusSearchBg = "linear-gradient(to left, #2c3e50, #4ca1af)";

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
  searchBg: (state = defaultSearchBg, action) => {
    switch(action.type) {
      case "SET_BACKGROUND":
        return action.bgColor
      default: 
        return state;
    }
  },
});

// --------------- END OF REDUX THINGS ------------- //

const Input = FRC.Input;

const StyledInput = glamorous(Input)({
  fontSmoothing: "antialiased",
  fontSize: "5rem",
  fontWeight: "bold",
  // background: "none",
  color: "white",
  boxShadow: "none",
  width: "100%",
  border: "none",
  outlineWidth: 0,
  "::placeholder": {
    color: "#9cfbff"
  },
  // copied and tinkered from: https://codepen.io/lehollandaisvolant/pen/aNQNjx
  background: "no-repeat",
  backgroundImage: "linear-gradient(to bottom, #4ca1af, #4ca1af)",
  backgroundSize: "0 5px, 100% 5px",
  backgroundPosition: "50% 100%, 50% 100%",
  transition: "background-size 0.3s cubic-bezier(0.64, 0.09, 0.08, 1)",
  ":focus": {
      backgroundSize: "100% 5px, 100% 5px",
      outline: "none"
  },
  textAlign: "center"
});

const SearchFormContainer = glamorous.div({
  padding: "50px 0",
  [mediaQueries.default]: {
    padding: "70px 100px"
  },
  "body": {
    height: "auto"
  }
});

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

    const BorderAnimeSpan = glamorous.span({

    })

    {/* onBlur Color is repetitive since it's being used as initial
      redux state value as well.
      Find a solution to get it from the initial state*/}
    return (
      <SearchFormContainer className="search-form">
        <Helmet>
          <style type="text/css">
          {`
              body {  
                background: ${searchBg}
              }
          `}
          </style>
        </Helmet>
        <Formsy.Form onChange={this.search}>
          <StyledInput
            className="search"
            name="searchQuery"
            value={this.state.search}
            placeholder={this.context.intl.formatMessage({id: "posts.search"})}
            type="text"
            layout="elementOnly"
            onFocus={() => setBackground(onFocusSearchBg)}
            onBlur={() => setBackground(defaultSearchBg)}
          />
          <BorderAnimeSpan className="border-bottom-anime"></BorderAnimeSpan>
          {this.state.search !== '' ? <Link className="search-form-reset" to={{pathname: '/', query: resetQuery}}><Components.Icon name="close" /></Link> : null}
        </Formsy.Form>
      </SearchFormContainer>
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
