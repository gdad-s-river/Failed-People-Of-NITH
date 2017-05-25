import React from 'react';
import { Link } from 'react-router';
import glamorous from 'glamorous';

const LinkBare = glamorous(Link)({
  color: "inherit",
  textDecoration: "none"
})

export default LinkBare;