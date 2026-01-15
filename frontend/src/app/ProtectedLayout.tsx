'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    // Check authentication on initial load
    if (typeof window !== 'undefined') {
      // Add a small delay to ensure token is properly set before checking
      const timer = setTimeout(() => {
        if (!isAuthenticated()) {
          router.push('/sign-in');
        } else {
          setCheckedAuth(true);
        }
      }, 50);

      return () => clearTimeout(timer);
    } else {
      setCheckedAuth(true);
    }
  }, [router]);

  // If not authenticated, show nothing while redirecting
  if (!checkedAuth) {
    return null; // Show nothing while checking authentication
  }

  if (typeof window !== 'undefined' && !isAuthenticated()) {
    return null;
  }

  return <>{children}</>;
}