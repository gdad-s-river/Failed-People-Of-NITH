- Download all the fonts on the server locally, so that it is server side rendered properly
- Ripple Effect on Sign in Buttons
- (Completely Optional): Make Image Behave Pretty with CSS Filters
- Replace select inputs with react-select
- Replace PropTypes and create-react-class imports with separate modules
- Add a delete button for invalidation flash messages.
- See any missing proptypes and fill them properly
- Register a fragment that is being used multiple times
- Implement infinite scroll instead of pagination
- add custome labels for necessary fields (to include a star).

```javascript
const mustCompleteFragment1 = gql`
  fragment UserMustCompleteFragment1 on User {
    _id
    ${Users.getRequiredFields().join("\n")}
  }
`
```

-
---

Required User Fields :

linkedinId,
rollno,
classOf,
branch,
email,
phNo,
displayName,
availableForServices (long for "available"):

---
