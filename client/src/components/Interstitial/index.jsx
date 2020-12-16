import { createPortal } from "react-dom";

import "./style.css";

let root = document.getElementById("interstitial-root");
if (!root) {
  root = document.createElement("div");
  root.setAttribute("id", "interstitial-root");
  document.body.appendChild(root);
}

const Interstitial = (props) => {
  return createPortal(
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        version="1"
        viewBox="0 0 128 128"
      >
        <g>
          <path
            fill="#b011b0"
            d="M78.75 16.18V1.56a64.1 64.1 0 0147.7 47.7H111.8a49.98 49.98 0 00-33.07-33.08zM16.43 49.25H1.8a64.1 64.1 0 0147.7-47.7V16.2a49.98 49.98 0 00-33.07 33.07zm33.07 62.32v14.62A64.1 64.1 0 011.8 78.5h14.63a49.98 49.98 0 0033.07 33.07zm62.32-33.07h14.62a64.1 64.1 0 01-47.7 47.7v-14.63a49.98 49.98 0 0033.08-33.07z"
          ></path>
          <animateTransform
            attributeName="transform"
            dur="400ms"
            from="0 64 64"
            repeatCount="indefinite"
            to="-90 64 64"
            type="rotate"
          ></animateTransform>
        </g>
      </svg>
    </div>,
    root
  );
};

export default Interstitial;
