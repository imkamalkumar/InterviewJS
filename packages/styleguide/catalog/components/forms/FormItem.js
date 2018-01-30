import css from "styled-components";
import {} from "prop-types";

import { setSpace } from "../../../utils";

const FormItem = css.div`
  position: relative;
  & > label {
    ${setSpace("mls")};
    left: 0;
    position: absolute;
    top: 0;
    transform: translateY(-50%);
    z-index: 100;
  }
  & > input,
  & > textarea {

  }
`;

FormItem.propTypes = {};

FormItem.defaultProps = {};

export default FormItem;
