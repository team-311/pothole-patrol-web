const createError = (message, code) => {
  const error = new Error(message)
  error.status = code || 500
  return error
}

const isResident = (req, res, next) => {
  if (req.user && req.user.type === 'resident') {
    next()
  } else {
    next(createError('Not Authorized', 401))
  }
}

const isCrewOrAdmin = (req, res, next) => {
  if (req.user && (req.user.type === 'admin' || req.user.type === 'crew' )) {
    next()
  } else {
    next(createError('Not Authorized', 401))
  }
}

const isCrewMemberOrAdmin = (req, res, next) => {
  if (req.user && req.user.type === 'admin') {
    next()
  } else if (req.user && req.user.type === 'crew' && req.user.crewId === Number(req.params.id)) {
    next()
  } else {
    next(createError('Not Authorized', 401))
  }
}

const isAdmin = (req, res, next) => {
  if (req.user && req.user.type === 'admin') {
    next()
  } else {
    next(createError('Not Authorized', 401))
  }
}

module.exports = {
  isResident,
  isCrewOrAdmin,
  isAdmin,
  isCrewMemberOrAdmin,
}
