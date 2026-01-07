import React from 'react'
import Breadcrumb from '../../components/ui/Breadcrumb'
import aboutBg from "../../assets/img/breadcrumb/01.jpg";
import AboutArea from '../../components/main/AboutArea';
import Counter from '../../components/main/Counter';
import Team from '../../components/main/Team';

const About = () => {
  return (
    <>
        <Breadcrumb
        title="About Us"
        bgImage={aboutBg}
        items={[
          { label: "Home", path: "/" },
          { label: "About Us", active: true }
        ]}
      />
      <AboutArea/>
      <Counter/>
      <Team/>
    </>
  )
}

export default About