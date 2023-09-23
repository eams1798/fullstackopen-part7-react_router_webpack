import PropTypes from "prop-types"

export const AnecdotePT = PropTypes.shape({
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
});

export const NotificationPT = PropTypes.shape({
  message: PropTypes.string
})