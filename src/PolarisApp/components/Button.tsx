import React, { ButtonHTMLAttributes, FC } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: string;
};

interface PolrsButtonProps extends ButtonProps {
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "disabled";
  size?: "sm" | "lg";
}

const Button: FC<PolrsButtonProps> = (props) => {
  const {
    children,
    backgroundColor,
    textColor,
    borderRadius,
    variant,
    ...rest
  } = props;

  const getBGColor = () => {
    if (variant === "secondary" || variant === "disabled") {
      return "#0E0E10";
    } else {
      return "#00B2FF";
    }
  };

  const getTextColor = () => {
    if (variant === "secondary") {
      return "whitesmoke";
    } else if (variant === "disabled") {
      return "#7E7E7E";
    } else {
      return "#0E0E10";
    }
  };

  const getBorder = () => {
    if (variant === "secondary") {
      return "1px solid whitesmoke";
    } else if (variant === "disabled") {
      return "1px solid #7E7E7E";
    } else {
      return "none";
    }
  };

  const getPadding = () => {
    if (props.size === "sm") {
      return "3px 16px";
    } else if (props.size === "lg") {
      return "14px 32px";
    } else {
      return "10px 24px";
    }
  };

  const getBorderRadius = () => {
    if (props.size === "sm") {
      return "5px";
    } else if (props.size === "lg") {
      return "15px";
    } else {
      return "10px";
    }
  };

  return (
    <button
      style={{
        backgroundColor: getBGColor(),
        color: getTextColor(),
        border: getBorder(),
        padding: getPadding(),
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontSize: "15px",
        fontWeight: "bold",
        borderRadius: getBorderRadius(),
      }}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
