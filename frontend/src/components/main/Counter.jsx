import React, { useEffect, useState } from "react";

import courseIcon from "../../assets/img/icon/course.svg";
import graduationIcon from "../../assets/img/icon/graduation.svg";
import teacherIcon from "../../assets/img/icon/teacher-2.svg";
import awardIcon from "../../assets/img/icon/award.svg";
import apiClient from "../../api/apiClient";

export const iconMap = {
  course: courseIcon,
  graduation: graduationIcon,
  teacher: teacherIcon,
  award: awardIcon
};

const CounterItem = ({ icon, end, title }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [end]);

  return (
    <div className="col-lg-3 col-sm-6">
      <div className="counter-box">
        <div className="icon">
          <img src={icon} alt={title} />
        </div>
        <div>
          <span className="counter">{count}</span>
          <h6 className="title">+ {title}</h6>
        </div>
      </div>
    </div>
  );
};

const Counter = () => {

  const [counters, setCounters] = useState([]);

  useEffect(() => {
    apiClient.get("/counter")
      .then(res => setCounters(res.data));
  }, []);

  return (
    <div className="counter-area pt-60 pb-60">
      <div className="container">
        <div className="row">
          {counters.map(counter => (
            <CounterItem
              key={counter._id}
              icon={iconMap[counter.icon]}
              end={counter.value}
              title={counter.title}
            />
          ))}
          {/* <CounterItem icon={courseIcon} end={500} title="Total Courses" />
          <CounterItem icon={graduationIcon} end={1900} title="Our Students" />
          <CounterItem icon={teacherIcon} end={750} title="Skilled Lecturers" />
          <CounterItem icon={awardIcon} end={30} title="Win Awards" /> */}

        </div>
      </div>
    </div>
  );
};

export default Counter;
