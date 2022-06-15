import React from "react";
import Navigation from "../components/Header";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
const MaxjaNFTPage = () => {
  const openApp = (e) => {
    e.preventDefault();
    window.open("https://maxja-project.nft");
  };
  return (
    <>
      <Navigation />
      <Banner image="/images/maxja-nft-overlay.png" title="Maxja NFT" />
      {/* Principles */}
      <div className="container pt-5 pb-5">
        <div className="row">
          <div className="col-6 text-center">
            <div className="mt-2">
              Welcome to <span className="fw-bold">MAXJA NFT Airdrop!</span>
            </div>
            <div className="mt-2">
              You certainly know what an AIRDROP is, but let us explain anyway,
              for any of you that may be new to this.{" "}
              <span className="fw-bold">
                An AIRDROP in this case is gifting an NFT.
              </span>
            </div>
            <div className="mt-2">
              What is an <span className="fw-bold">NFT?</span>
            </div>
            <div className="mt-2">
              <span className="fw-bold">Non-Fungible-Tokens</span> or so-called
              NFTs are basically crypto tokens just like any other tokens.
              However, these tokens are unique and are “non-fungible”.
              Non-fungible meaning they cannot be duplicated, replicated or
              replaced. While most of the crypto tokens are “fungible” like
              Bitcoin as they can be duplicated and replaced.
            </div>
            <div className="mt-2">
              <span className="fw-bold">MAXJA NFT</span> is a new project that
              started through a
              <span className="fw-bold"> Polygon hackathon</span> organized by
              <span className="fw-bold"> Encode</span> in June 2022.
            </div>
            <div className="mt-2">
              This first launch of Maxja NFT to the community will be THE
              MANDALA, which is the first sticker we created in 2019 the 3rd
              edition of the festival. The reason why we have picked this
              watercolor draw is that it means “Circle”. For us it is the icon
              of the community sitting around a circle communicating from the
              heart, listening with love and respect. This is also why this NFT
              is not transferable because once you have it you are part of this
              community and it is like sitting around the fire together.
            </div>
          </div>
          <div className="col-6">
            <img
              className="p-5"
              src="/images/maxja-nft.png"
              alt="maxja-nft"
              height="500"
            />
          </div>
        </div>
      </div>

      {/* LEAVE NO TRACE */}
      <div
        className="container-fluid text-white p-5"
        style={{ backgroundColor: "#F69043" }}
      >
        <div className="row mx-auto" style={{ maxWidth: "800px" }}>
          <div className="col text-center">
            If you are interested in participating in MAXJA 2022 you must have
            THE MANDALA NFT and then you will have access to purchase THE DEER
            which is the ticket entry for MAXJA 2022 Festival and gives you a
            10% of discount on the accommodation.
            <br />
            <br />
            In order for you to receive those, you must already OPEN A WALLET,
            which is a virtual space in which you can receive it. We recommend
            you open a wallet with METAMASK because it is easy to use and
            secure.
            <br />
            <br />
            So are you ready ?
            <br />
            <br />
            <button
              style={{ backgroundColor: "#B53848" }}
              onClick={openApp}
              className="btn btn-secondary"
            >
              Click Here to register and receive your Mandala NFT
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MaxjaNFTPage;
