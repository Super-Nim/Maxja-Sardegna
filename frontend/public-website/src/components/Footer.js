import React from "react";

const Footer = () => {
  const discordClick = (e) => {
    e.preventDefault();
    window.open("https://discord.gg/ReMTCvcF");
  };

  const twitterClick = (e) => {
    e.preventDefault();
    window.open("https://twitter.com/MaxjaSardegna");
  };
  return (
    <div className="container">
      <div className="row p-4">
        <div className="col-6 text-center">
          <button
            onClick={discordClick}
            type="button"
            className="btn btn-primary w-100 p-4"
            style={{
              background: "none",
              border: "1px solid #B53848",
              color: "black",
            }}
          >
            <img
              src="/images/discord.png"
              alt="discord"
              width="60"
              height="60"
            />
            JOIN US ON DISCORD
          </button>
        </div>
        <div className="col-6 m-auto">
          <button
            onClick={twitterClick}
            type="button"
            className="btn btn-primary w-100 p-4"
            style={{
              background: "none",
              border: "1px solid #B53848",
              color: "black",
            }}
          >
            <img
              src="/images/twitter.png"
              alt="twitter"
              width="60"
              height="60"
            />
            JOIN US ON TWITTER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
