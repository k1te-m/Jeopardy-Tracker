import React from "react";

const Tribute = () => {
  return (
    <div className="container tribute">
      <div className="row">
        <div className="col-md-6">
          <p className="quote">
            "We're trying to build a gentler, kinder society. And if we all chip
            in — we'll get there." - Alex Trebec
          </p>
          <p>Thank you for everything, Alex.</p>
        </div>
        <div className="col-md-6 m-0 p-0 pb-3">
          <iframe
            title="Tribute to Alex Trebec"
            className="video"
            src="https://www.youtube.com/embed/arsStQAhHVA"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>
      </div>
    </div>
  );
};

export default Tribute;
