"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthComponent = (props: P) => {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, _hasHydrated } = useAuthStore();

    useEffect(() => {
      if (_hasHydrated && !isAuthenticated) {
        router.push(`/signin?redirectTo=${encodeURIComponent(pathname)}`);
      }
    }, [_hasHydrated, isAuthenticated, pathname, router]);

    // Prevent rendering until hydration is done
    if (!_hasHydrated || !isAuthenticated) return null;

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
