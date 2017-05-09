- Download all the fonts on the server locally, so that it is server side rendered properly
- Ripple Effect on Sign in Buttons
- (Completely Optional): Make Image Behave Pretty with CSS Filters
- Replace select inputs with react-select
- Replace PropTypes and create-react-class imports with separate modules
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

## Vulcan Questions:

I’ve the following usecase:

I’m trying to make an Alumni Index using Vulcan. As in the *example-forum* application, if a person doesn’t have required fields filled in, a modal window with those field inputs are prompted to the user.

I’m signing people up with social logins but I also would want them to fill up addition fields for example:

```
linkedinId
rollNo
classOf
branch
email
phNo
```

I want to ask how it could be possible, say for a current student (identified through _classOf_) filling this required fields form to dynamically have a `availableForAlumniFavors` required field
