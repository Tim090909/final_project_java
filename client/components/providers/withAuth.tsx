import React from 'react';
import useAuth from '@/hooks/useAuth';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return (props: P) => {
    const isAuthenticated = useAuth();

    if (!isAuthenticated) {
      return null; 
    }

    return <WrappedComponent {...props} />;
  };
};


export default withAuth;