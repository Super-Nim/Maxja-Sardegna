import React from "react";

const Banner = ({ image, title, subtitle }) => {
  return (
    <div className="container-fluid p-0 overflow-hidden text-center">
      <div className="row">
        <img className="img-fluid" src={image} />
        <div
          className="p-0 overflow-hidden"
          style={{
            width: "100%",
            position: "absolute",
            left: "0",
          }}
        >
          <div
            style={{
              maxWidth: "75%",
              margin: "0 auto",
              color: "white",
              marginTop: subtitle != null ? "14%" : "20%",
            }}
          >
            <h1 style={{ fontWeight: "bold", fontSize: "3.5rem" }}>{title}</h1>
            {subtitle && (
              <div className="pt-2" style={{ fontSize: "1.35rem" }}>
                {subtitle}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
