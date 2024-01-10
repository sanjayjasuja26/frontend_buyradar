import { BeatLoader } from "react-spinners";
import { css } from "@emotion/react";

const override = css`
  margin-left: 5px;
  margin-top: 9px;
`;

interface ButtonLoaderProps {
  show: boolean;
  color?: string;
  size?: number;
}

export const ButtonLoader = ({ show, color, size }: ButtonLoaderProps) => {
  return (
    <BeatLoader
      size={size ? size : 10}
      color={color ? color : "#fff"}
      loading={show}
      css={override}
    />
  );
};

export const FullPageLoader = () => {
  return (
    <div className="full-page-loader">
      <BeatLoader size="20px" color="#6b4eaf" />
    </div>
  );
};
