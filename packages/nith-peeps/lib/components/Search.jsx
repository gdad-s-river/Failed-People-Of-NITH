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

import Media from 'react-media';

const  defaultSearchBg = "linear-gradient(to left, #2c3e50, #4ca1af)";
const  onFocusSearchBg = "linear-gradient(to left, #2c3e50, #4ca1af)";

// const links = [
//   // note: modal popups won't work with anything above alpha.5. 
//   // see https://github.com/twbs/bootstrap/issues/21876#issuecomment-276181539
//   {
//     rel: 'stylesheet',
//     type: 'text/css',
//     href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/css/bootstrap.min.css'
//   }
// ];

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

// TODO: us repeated from user-custom-fields, 
// put this in a separate file and reuse 
// at both places.

function buildBranches() {
  let list = [{value: "select-branch", label: "select-branch", disabled:true}];
  let branches = new Set([
    "ECE",
    "MED",
    "Archi",
    "EEE",
    "Civil",
    "CSE",
    "Chemistry",
    "Chemical",
    "Mathematics",
    "Physics",
    "CEE",
    "Mgtm & Humanity",
    "CMSE"
  ])

  for (let branch of branches) {
    list.push({
      value: branch,
      label: branch
    })
  }

  return list;
}

function buildYears() {
  let lastValidYear = new Date().getFullYear() + 5;
  let list = [{value: lastValidYear, label: "select-year", disabled:true}];
  for (let i = 1986; i <= lastValidYear; i++) {
    list.push({
      value: i.toString(),
      label: i
    });
  }

  return list;
}

const { Input, Select } = FRC;

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
    // let lastValidYear = new Date().getFullYear() + 5;
    this.state = {
      search: props.router.location.query.query || '',
      selectedBranch: "",
      selectedYear: ''
    }
    this.branchSelectOnChangeHandler = this.branchSelectOnChangeHandler.bind(this)
    this.yearSelectOnChangeHandler = this.yearSelectOnChangeHandler.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      search: this.props.router.location.query.query || ''
    });
  }

  search(data) {

    // console.log("data is: ", data);

    const router = this.props.router;
    const routerQuery = _.clone(router.location.query);

    // console.log("router query: ", routerQuery);
    delete routerQuery.query;
    
    const branch = data.branch || "";


      function searchQueryBuilder() {
        return data.searchQuery === '' ? routerQuery : { ...routerQuery, query: data.searchQuery }
      }

      function branchQueryBuilder(){
        return data.branch === '' ? routerQuery : { branch: data.branch }
      }

      function yearQueryBuilder() {
        return data.graduatingYear === '' ? routerQuery : { graduatingYear: data.graduatingYear }
      }

      const query = _.extend( {}, searchQueryBuilder(), branchQueryBuilder(), yearQueryBuilder())
      // console.log(query1);

    

    // const query1 = data.searchQuery === '' ? ( data.branch ? {...routerQuery, branch: branch } : routerQuery ) : {...routerQuery, query:data.searchQuery, branch: branch};

    // console.log("query ", query); 

    delay(() => {
      router.push({pathname: "/search", query: query});
    }, 700 );

  }

  /* https://github.com/twisty/formsy-react-components/blob/master/src/components/select.js#L25 */
  branchSelectOnChangeHandler(branchStringName, value) {
    // console.log(value)
    this.setState({
      selectedBranch: value
    })
  }

  yearSelectOnChangeHandler(yearStringName, value) {
    // console.log(typeof value);
    this.setState({
      selectedYear: value
    })
  }

  render() {

    const buttonStyles = {
      fontFamily: "inherit",
      background: "#5cd9d9",
      border: 0,
      padding: "10px",
      fontSize: "1rem",
      margin: "10px 10px 0 0",
      width: "155px"
    }

    const leftButtonStyles = {
      margin: "10px 10px 0 11px"
    }

    const selectStyles = {
      height: "calc(2.5rem - 2px)",
      width: "42%",
      padding: ".5rem .75rem",
      fontSize: "1rem",
      lineHeight: "1.25",
      color: "#55595c",
      backgroundColor: "#9cfbff",
      backgroundImage: "none",
      backgroundClip: "padding-box",
      border: "1px solid rgba(0,0,0,.15)",
      borderRadius: ".25rem",
      margin: "3px 0",
      // "@media(minWidth: 600px)": {
      //   width: "30%"
      // }
    }

    const upperSelectStyles = {
      margin: "20px 0 0",
    }

    const mediaSelectStyles = {
      width: "30%"
    }

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

          <div className="filter-options" style={{
            textAlign: "center", 
            fontFamily: "Raleway, Arial, sans-serif"
          }}>

            <div className="dropdown-filter-container">
          {/* TOO MUCH REPETITION HERE, SEPARATE SELECT COMPONENT IN ITS OWN MODULE*/}
              <Media query="(min-width: 600px)">
                {matches => matches ? (
                <div>
                  <Select 
                    name="branch" 
                    options={buildBranches()}
                    value={this.state.selectedBranch}
                    onChange= {this.branchSelectOnChangeHandler}
                    style={{...selectStyles, ...upperSelectStyles, ...mediaSelectStyles}}/> 

                  <Select 
                    name="graduatingYear" 
                    options={buildYears()}
                    value={this.state.selectedYear}
                    onChange= {this.yearSelectOnChangeHandler}
                    style={{...selectStyles, ...mediaSelectStyles}}/>
                </div>
                ) : (
                <div>
                  <Select 
                    name="branch" 
                    options={buildBranches()}
                    value={this.state.selectedBranch}
                    onChange= {this.branchSelectOnChangeHandler}
                    style={{...selectStyles, ...upperSelectStyles}}/> 

                  <Select 
                    name="graduatingYear" 
                    options={buildYears()}
                    value={this.state.selectedYear}
                    onChange= {this.yearSelectOnChangeHandler}
                    style={selectStyles}/>
                 </div>
                )}
              </Media>
            </div>
            

            <button
              name="reset-branch-query"
              style={{...buttonStyles, ...leftButtonStyles}}
              onClick={ (e) => {
                // console.log(e.target)
                this.setState({selectedBranch: ''})
                // const query = this.props.router.location.query.query;

                const {branch, ...rest} = this.props.router.location.query;

                // console.log({pathname: "/search", query: {query} });
                // console.log(this.props.router.location.query.query);
                this.props.router.replace({
                  pathname: "/search", 
                  query: {
                    query: rest["query"],
                    graduatingYear: rest["graduatingYear"]
                  } 
                });
              }}>
                Reset Branch
              </button>

              <button
                name="reset-year-query"
                style={buttonStyles}
                onClick={ (e) => {
                  // console.log(e.target)
                  this.setState({selectedYear: ''})
                  // const query = this.props.router.location.query.query;
                  
                  // console.log("location query ", this.props.router.location.query);
                  const {graduatingYear, ...rest} = this.props.router.location.query;
                  
                  // console.log("rest", rest);
                  let keys = Object.keys(rest);

                  let queryObj = keys.map(el => {
                    return {
                      [el]: rest[el]
                    }
                  })
            
                  // console.log(queryObj);

                  // let pushValue = _.extend({}, {
                  //     pathname: "/search",
                  //   },
                  //   {branch: {branch: rest["branch"]}},
                  //   {query: {query: rest["query"]}}
                  //   )

                  // console.log(pushValue);

                  this.props.router.push({
                    pathname: "/search",
                    query: {
                      query: rest["query"],
                      branch: rest["branch"]
                    }
                  });
                }}>
                  Reset Year
              </button>
             </div>

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
