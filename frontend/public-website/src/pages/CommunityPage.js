import React from "react";
import Navigation from "../components/Header";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

const CommunityPage = () => {
  return (
    <>
      <Navigation />
      <Banner
        image="/images/community-banner-overlay.png"
        title="Our Community"
        subtitle="MAXJA is an annual gathering that brings together a growing
              conscious community (the young, elders, kids and their families)
              in the beautiful island of Sardinia. The campsite where the
              activities take place has direct access to the beach and is
              surrounded by nature. A unique opportunity to share, express, and
              connect with others, ourselves and our planet."
      />
      {/* Principles */}
      <div className="container pt-5 pb-5">
        <div className="row">
          <h4>Principles</h4>
          <div className="mt-2">
            MAXJA's principles are the fire around which the whole community is
            invited to sit and talk, and they can evolve over time and adapt to
            the new realities we are creating together. They come from our
            experiences together, and from festivals and gatherings that have
            changed and deeply inspired us.
          </div>
        </div>
      </div>

      {/* INCLUSION EXPRESSION*/}
      <div className="container-fluid">
        <div className="row text-white">
          <div className="col-6" style={{ backgroundColor: "#741918" }}>
            <div className="p-10">
              <img alt="inclusion" src="/images/inclusion.png" />
              <h4 className="mt-4">INCLUSION</h4>
              <div>
                <div>
                  Anyone can be part of the MAXJA community. We welcome and
                  respect all human beings as unique beings.
                </div>
                <div className="mt-5">
                  One of our beliefs at MAXJA is that when we connect with our
                  essence, we are authentic. Each person with their color, shape
                  and energy.
                </div>
              </div>
            </div>
          </div>
          <div className="col-6" style={{ backgroundColor: "#F69043" }}>
            <div className="p-10">
              <img alt="expression" src="/images/expression.png" />
              <h4 className="mt-4">EXPRESSION</h4>
              <div>
                <div>
                  "Maxja is a gathering that promotes free expression,
                  respecting the freedom of others."
                </div>
                <div className="mt-5">
                  Nothing in our reality is isolated, we live in a universe of
                  interconnections and everything is related to each other. This
                  is why from a holistic perspective we are a unity. No
                  individual can act alone, and our participation is necessary
                  to create the reality we want to live.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PARTICIPATION */}
      <div
        className="container-fluid text-white pt-4"
        style={{ backgroundColor: "#B53848" }}
      >
        <div className="row">
          <div className="col-4 m-auto p-5 text-center">
            At MAXJA your participation is essential, together we build,
            together we create, together we make it possible.
          </div>
          <div className="col-4">
            <img alt="hand" src="/images/hand.png" />
          </div>
          <div className="col-4 m-auto">
            The third principle is:
            <div>
              <span className="fw-bold">PARTICIPATION</span>
            </div>
            <div className="mt-4">
              Our community promotes a radical ethics of participation.
            </div>
            <div className="mt-4">
              We believe that change, both personal and in society, can only be
              achieved through the participation of the individual. That is why
              we invite everyone in the community to take part in this creation.
            </div>
          </div>
        </div>
      </div>

      {/* LEAVE NO TRACE */}
      <div
        className="container-fluid text-white pt-4"
        style={{ backgroundColor: "#F69043" }}
      >
        <div className="row">
          <div className="col-4 m-auto p-5">
            <div>
              Trying to take care of every detail, we always seek to have the
              least possible impact on the environment, as well as welcome all
              proposals that create awareness on how to improve it.
            </div>
            <div className="mt-3">Our fifth principle is:</div>
            <div>
              <span className="fw-bold">LEAVE NO TRACE</span>
            </div>
            <div className="mt-4">
              Our community respects the environment. We are committed to
              leaving no physical trace of our activities wherever we
              congregate. We clean up where we dirty and try, where possible, to
              leave these places better than we found them.
            </div>
          </div>
          <div className="col-4 m-auto text-center p-5">
            <div>
              All of our actions have an impact on the world. Our commitment to
              the environment is at the heart of our festival.
            </div>
          </div>
          <div className="col-4 m-auto">
            <img
              alt="hand"
              src="/images/hand-right.png"
              className="float-end"
              style={{ marginRight: "-12px" }}
            />
          </div>
        </div>
      </div>

      {/* GIFT */}
      <div className="container">
        <div className="row p-5">
          <div className="col-4 m-auto">
            <img src="/images/gift.png" />
          </div>
          <div className="col-8 p-5">
            <div>Our sixth principle is the </div>
            <div>
              <span className="fw-bold">GIFT</span>
            </div>
            <div className="mt-3">
              At MAXJA, every year, we co-create for a few days the experience
              of living a culture radically different from the current one, for
              most of us.
            </div>
            <div className="mt-3">
              For this to happen, our community promotes a gift economy within
              the festival.
            </div>
            <div className="mt-3">
              The value of a gift is unconditional. In fact, this gift does not
              provide for the return or exchange.
            </div>
            <div className="mt-3">
              Thus offering from the abundance of our heart, which is infinite.
            </div>
          </div>
        </div>
      </div>

      {/* COMMON RESOURECES - NO COMMERCE */}
      <div className="container-fluid">
        <div className="row text-white">
          <div className="col-6" style={{ backgroundColor: "#741918" }}>
            <div className="p-10">
              <img alt="resources" src="/images/resources.png" />
              <h4 className="mt-4">
                WE RELY ON OUR COMMON RESOURCES AND EFFORT
              </h4>
              <div>
                At Maxja each person is encouraged to rely on their gifts and
                talents - Maxja does not accept sponsors and relies on the
                common effort of each participant; the co-creators work together
                to make the festival possible using all their skills, creativity
                and cooperation. " Following the flow: Sometimes, life leads us
                to unexpected places; to people who influence our thinking; to
                events that inspire our creativity. Join the magic of
                co-creation, put into play your talents and gifts, each one of
                you is invited to participate in all phases of the creation of
                the festival so that its realization is possible. Uniting our
                hearts, magic manifests"
              </div>
            </div>
          </div>
          <div className="col-6" style={{ backgroundColor: "#F69043" }}>
            <div className="p-10">
              <img alt="commerce" src="/images/commerce.png" />
              <h4 className="mt-4">NO COMMERCE</h4>
              <div>
                We choose for MAXJA to preserve the spirit of the gift, give
                space to the spontaneous community, and nurture the beauty of
                meeting in an environment free from commerce. Even the Pozzo
                Sacro this year will not have the symbolic monetary exchange,
                but the time of gifting. Everyone will be able to offer the time
                and love of a treatment to someone else who will love to receive
                it. With this we want to give everyone the opportunity to
                experience three days without thinking about the material
                exchange, opening ourselves to a more genuine experience close
                to the essence of our humanity, leaving space for intimacy,
                immediacy, and connection with the nature that surrounds us.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CommunityPage;
