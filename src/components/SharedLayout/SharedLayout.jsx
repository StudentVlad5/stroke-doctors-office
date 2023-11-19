import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'components/Header/Header';



export const SharedLayout = () => {
  return (
    <>
      <Suspense fallback={'Loading...'}>
        <Header />
        <main>
          <Outlet />
        </main>
      </Suspense>
    </>
  );
};
