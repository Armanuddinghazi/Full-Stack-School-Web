import React, { useEffect, useState } from "react";

import courseIcon from "../../assets/img/icon/course.svg";
import graduationIcon from "../../assets/img/icon/graduation.svg";
import teacherIcon from "../../assets/img/icon/teacher-2.svg";
import awardIcon from "../../assets/img/icon/award.svg";
import apiClient from "../../api/apiClient";
import CounterSkeleton from "../ui/CounterSkeletonItem";

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
          <img src={import.meta.env.VITE_API_URL_IMG + icon} alt="" />
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
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   apiClient.get("/counter")
  //     .then(res => setCounters(res.data));
  // }, []);

  useEffect(() => {
    apiClient.get("/counter")
      .then(res => setCounters(Array.isArray(res.data) ? res.data : []))
      .catch(() => setCounters([]))
      .finally(() => {
          setLoading(false)
      });
  }, []);

  return (
    <div className="counter-area pt-60 pb-60">
      <div className="container">
        <div className="row">
          {loading ? (
            <CounterSkeleton />
          ) : (
          counters.map(counter => (
            <CounterItem
              key={counter._id}
              icon={counter.icon}
              end={counter.value}
              title={counter.title}
            />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Counter;
