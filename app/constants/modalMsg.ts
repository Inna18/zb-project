export const modalMsgConstants = () => {
  const USER_CREATE_SUCCESS =
    'Sign-up was successfull. Navigate to Login page?';
  const USER_CREATE_ERROR = 'User already exists.';
  const USER_LOGIN_ERROR = 'No such user. Check credentials.';
  const USER_UPDATE_SUCCESS = 'Profile details updated.';

  const ORGANIZATION_UPDATE_SUCCESS = 'Organization details updated.';

  const CATEGORY_LIMIT_ERROR = 'Only up to 10 categories can be created.';

  return {
    USER_CREATE_SUCCESS,
    USER_CREATE_ERROR,
    USER_LOGIN_ERROR,
    USER_UPDATE_SUCCESS,
    ORGANIZATION_UPDATE_SUCCESS,
    CATEGORY_LIMIT_ERROR,
  };
};
