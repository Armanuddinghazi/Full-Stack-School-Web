import React from 'react'
import Hero from './Hero'
import FeatureArea from './FeatureArea'
import AboutArea from './AboutArea'
import Counter from './Counter'
import CourseArea from './CourseArea'
import Team from './Team'
import Choose from './Choose'
import Gallery from './Gallery'
import Department from './Department'
import Blog from './BlogArea'
import TestimonialSlider from './TestimonialSlider'

const Index = () => {
  return (
    <>
         <Hero/>
         <FeatureArea/>
         <AboutArea/>
         <Counter/>
         <CourseArea/>
         <Team/>
         <Choose/>
         <Gallery/>
         {/* <EnrollArea/> */}
         <Department/>
         <TestimonialSlider/>
         <Blog/>
    </>
  )
}

export default Index