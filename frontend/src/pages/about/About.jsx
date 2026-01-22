import React from 'react'
import Breadcrumb from '../../components/ui/Breadcrumb'
import aboutBg from "../../assets/img/breadcrumb/01.jpg";
import Counter from '../../components/main/Counter';
import Team from '../../components/main/Team';
import AboutPage from './AboutPage';
import MissonVision from '../missonvision/MissonVision';
import TestimonialPage from './TestimonialPage';

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
      <AboutPage/>
      <MissonVision/>
      <Counter/>
      <TestimonialPage/>
      <Team/>
    </>
  )
}

export default About