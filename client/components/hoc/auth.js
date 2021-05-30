// @ts-check
import { useRouter } from 'next/router';
import { Fragment, useContext, useEffect } from 'react';
import { sharedValues, UserContext } from 'state';
import { getCookie } from 'utils';

const withAuthentication = (Component, ensureAuth) => {
  return props => {
    const router = useRouter();
    const userContext = useContext(UserContext);

    useEffect(() => {
      (() => {
        const user = getCookie(sharedValues.userAccount);
        const currentUser = JSON.parse(user || '{}');

        if (!currentUser && ensureAuth) {
          router.push('/?message=Authentication required');
        }

        if (!userContext.state?.user?.id && currentUser?.id)
          userContext.dispatch({
            type: 'SIGNIN_USER',
            payload: {
              authenticated: true,
              token: getCookie(sharedValues.userToken),
              user: currentUser,
            },
          });
      })();
    }, []);

    // reinforce auth
    useEffect(() => {
      if (ensureAuth && !userContext.state.authenticated) {
        router.push('/?message=Authentication required');
      }
    }, [userContext.state.authenticated]);

    return <Fragment>{ensureAuth && !getCookie(sharedValues.userToken) ? <span /> : <Component {...props} />}</Fragment>;
  };
};

export default withAuthentication;
