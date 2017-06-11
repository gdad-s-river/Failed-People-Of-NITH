const hasFlagged = (user, allegedFlaggedUserDoc) => {
  console.log("inside hasFlagged function ", allegedFlaggedUserDoc);
  // note(apollo): check upvoters depending if the document is queried by mongo directly or fetched by an apollo resolver
  return (
    user &&
    !!allegedFlaggedUserDoc.flagVoters.find(
      u => (typeof u === "string" ? u === user._id : u._id === user._id),
    )
  );
};

export { hasFlagged };
