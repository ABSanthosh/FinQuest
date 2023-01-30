import "./FancyButton.scss";

function FancyButton({
  children,
  className = "",
  isLink = false,
  href = "",
  innerRef = null,
  invertButton = false,
  noHover = false,
  ...props
}) {
  if (isLink) {
    return (
      <a
        href={href}
        className={`${
          invertButton ? "FancyButton__inverted" : "FancyButton"
        } ${className}
        ${noHover ? "" : "FancyButton--hover"}
        `}
        ref={innerRef}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={`${
        invertButton ? "FancyButton__inverted" : "FancyButton"
      } ${className}
      ${noHover ? "" : "FancyButton--hover"}
      `}
      ref={innerRef}
      {...props}
    >
      {children}
    </button>
  );
}

export default FancyButton;
