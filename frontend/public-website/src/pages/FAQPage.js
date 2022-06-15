import React from "react";
import Navigation from "../components/Header";
import Banner from "../components/Banner";
const FAQPage = () => {
  return (
    <>
      <Navigation />
      <Banner image="/images/faq-overlay.png" title="FAQ" />
      {/* Principles */}
      <div className="container pt-5 pb-5">
        <div className="row">
          <div className="col-6">
            <div className="mt-2">
              The first launch of Maxja NFT to the community will be the MANDALA
              which is the first stiker we created in 2019 the 3rd edition of
              the festival!
            </div>
            <div>
              The reason why we have picked this draw is because as we all know
              the MANDALA, which is Sanskrit means “circle”, is a geometric
              design that holds a great deal of symbolism. The Mandalas are
              believed to represent different aspects of the universe and for us
              is the icon of the community sitting around a circle communicating
              from the heart, listening with love and respect.
            </div>
          </div>
          <div className="col-6">NFT Image</div>
        </div>
      </div>

      {/* LEAVE NO TRACE */}
      <div
        className="container-fluid text-white p-5"
        style={{ backgroundColor: "#F69043" }}
      >
        <div className="row">
          <div className="col text-center">
            If you are interested in purchasing MAXJA TICKET for the 2022 in
            crypto currency you must join the AIRDROP and get the MANDALA NFT so
            you are officially sitting in the circle! <br />
            <br />
            In order for you to receive this you must already OPENED A WALLET
            which you could have with XXXXXXXXXXXXXXXXX and then
            <br />
            <br />
            <button className="btn btn-secondary">CLICK HERE</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQPage;
