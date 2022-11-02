import React from "react";
import logo from "../../assets/images/logo.png";

function AboutUs() {
  return <>
    <nav className="navbar bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img
              alt="logo"
              className="mt-2 mb-2"
              src={logo}
              width={200}
              height={130}
          />
        </a>
      </div>
    </nav>
    <div className="container shadow-sm my-5 p-4">
      <h3 className={"text-underline"}>About Us</h3>
      <p>We are a prominent car wash company extensive experience in light vehicle wash techniques. We have been able to maintain the desired fame in business circles for being the best car wash company due to the excellent quality provided by us.</p>

      <br/><h5>The Company Profile </h5>
      <p>ECO Friendly Car wash based in Dubai. We are actively involved in Residential and commercial building cleaning. ECO Friendly car wash carries high-quality waterless car products and services that are completely biodegradable, silicon free, anti-fungal, sticking gum remover, and 100% natural eco-friendly. The prime benefit of Eco-friendly car wash service for vehicle owners is that they can get rid of all difficulties of getting the car cleaned at gas stations by spending their valuable time since They are getting industries best cleaning solution at their doorsteps in a very Professional and cost-effective way.</p>

      <br/><h5>Benefits Of Good Customer service </h5>
      <p>
        <ul>
          <li>24/7 Service provided and quality and any number of quantities maintained Stronger and brand identity </li>
          <li>Operates a stable business </li>
          <li>Time-Saving, fuel saving </li>
          <li>Doorstep services </li>
          <li>Customer convenient easy payment methods </li>
          <li>Frequent customers touchpoint from management</li>
        </ul>
      </p>

      <br/><h5>Our Service </h5>
      <p>We offer total car wash techniques for customers who prefer a complete cleaning of their vehicles.it includes inside and outside cleaning, window cleaning, polishing,
        Etc
      </p>

      <br/><h5>Mission</h5>
      <p>We are value – driven company and our mission is to bring customers everywhere a professional and superior quality of car cleaning services that do not harm the environment or end-user  </p>

      <br/><h5>Vision </h5>
      <p>To rapidly grow and to become the first name in UAE as the most innovative and nature friendly car cleaning service company and continue providing customers high quality service. </p>

      <br/><h5>Our values </h5>
      <p><ul>
        <li>Serve our customers with professional staff </li>
        <li>We strive to conserve water resource  </li>
        <li>Treat customers with high respect by providing quality service </li>
        <li>Saving customers time in very cost-effective way  </li>
        <li>Always trying to add values our customers   </li>
      </ul></p>

      <br/><h5>Product </h5>
      <p>Most innovative spray and wipe technology along with microfiber towels remove dirt from the body surface of your light and heavy vehicle and restore a superior spotless glow. Our premium product is not just waterless wash but it has got both wax and clean application.

        The special combination of wax product gives your car high protection from micro scratches and leaves your car absolutely spotless with a nature glow.
      </p>
    </div>
  </>;
}

export default AboutUs;
