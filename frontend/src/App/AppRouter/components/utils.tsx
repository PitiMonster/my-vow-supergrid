import { Navigate, Route, generatePath, useParams } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
const NavigateWithParams = ({ path }: { path: string }) => {
  const params = useParams();
  return <Navigate replace to={generatePath(path, params)} />;
};

export const redirectToDefaultPath = (path: string) => (
  <Route path="" element={<NavigateWithParams path={path} />} />
);
