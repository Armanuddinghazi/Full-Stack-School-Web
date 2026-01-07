import { Link } from "react-router-dom";

const Breadcrumb = ({ title, bgImage, items }) => {
  return (
    <div
      className="site-breadcrumb"
      style={{
        backgroundImage: `url(${bgImage})`
      }}
    >
      <div className="container">
        <h2 className="breadcrumb-title">{title}</h2>

        <ul className="breadcrumb-menu">
          {items.map((item, index) => (
            <li
              key={index}
              className={item.active ? "active" : ""}
            >
              {item.path ? (
                <Link to={item.path}>{item.label}</Link>
              ) : (
                item.label
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Breadcrumb;
