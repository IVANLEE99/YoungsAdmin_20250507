import { useLocation, useNavigate } from "react-router-dom";

const withRouter = (Component) => {
  return (props) => (
    <Component {...props} location={useLocation()} navigate={useNavigate()} />
  );
};

export default withRouter;
