import React from "react";
import IconOne from "../assets/images/icon_1.png";
import IconTwo from "../assets/images/icon_2.png";
import IconThree from "../assets/images/icon_3.png";

const About = () => {
  const workInfoData = [
    {
      image: IconOne,
      title: "Personalized Quizzes",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci ",
    },
    {
      image: IconTwo,
      title: "Practice Problems",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et ",
    },
    {
      image: IconThree,
      title: "Progress Tracking",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
    },
  ];
  return (
    <div className="PageSection light-gray">
    <div id="AboutPage"  className="sectionContainer">
      <div className="work-section-top">
        <h1 className="primary-heading">What We Do</h1>
        <p className="primary-text">
          Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et
          elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default About;
