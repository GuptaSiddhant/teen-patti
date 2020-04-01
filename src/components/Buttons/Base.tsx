
import styled from "@emotion/styled";

import { getDimInREM } from "../../helper";

export const StyleButton = styled.div`
  padding: ${getDimInREM(6)};
  border-radius: ${getDimInREM(4)};
  box-shadow: ${getDimInREM(2)} ${getDimInREM(2)} ${getDimInREM(4)} 0 #00000040,
    ${getDimInREM(-2)} ${getDimInREM(-2)} ${getDimInREM(4)} 0 #f2f2f280;
  background: #fff;
  text-align: center;
  cursor: pointer;
  svg {
    height: ${getDimInREM(12)};
    width: ${getDimInREM(12)};
  }
`;
