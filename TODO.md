- Download all the fonts on the server locally, so that it is server side rendered properly
- Ripple Effect on Sign in Buttons
- (Completely Optional): Make Image Behave Pretty with CSS Filters
- Replace select inputs with react-select
- Replace PropTypes and create-react-class imports with separate modules
- Add a delete button for invalidation flash messages.
- See any missing proptypes and fill them properly
- Register a fragment that is being used multiple times
- Implement infinite scroll instead of pagination
- add custom labels for necessary fields (to include a star).
- Handle Uncompleted Profile (When a user logs out before completing a profile): check this in the UsersList component

```javascript
const mustCompleteFragment1 = gql`
  fragment UserMustCompleteFragment1 on User {
    _id
    ${Users.getRequiredFields().join("\n")}
  }
`
```

- Link preload font fetches 

-
---

Required User Fields :

availableForServices (long for "available"):

---
## FUN FEATURES : 

- LIST OF ROLL DIRECTS BENEATH EVERY PROFILE
- [Search Input Onfocus interaction animation](https://tympanus.net/Development/TextInputEffects/index2.html)

## GENERAL CURIOUS STUFF:

- What can be done with HTTP push?