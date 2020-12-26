import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Container = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(8);
  const [perPage, setPerPage] = useState(12);
  const dataLength = data.length;
  const pages = Math.ceil(dataLength / perPage);

  // console.log(pages)
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then(res => res.json())
      .then(res => setData(res));
  }, []);

  return (
    <div className="container">
      <Router>
        <div className="container pages">
          <ul>
            <li>
              <Link to={`/1`} onClick={() => setCurrentPage(1)}>
                Start
              </Link>
            </li>
            <li>
              <Link
                to={`/${currentPage - 1}`}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                {currentPage - 1}
              </Link>
            </li>
            <li>{currentPage}</li>
            <li>
              <Link
                to={`/${currentPage + 1}`}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                {currentPage + 1}
              </Link>
            </li>
            <li>
              <Link
                to={`/${currentPage}`}
                onClick={() => setCurrentPage(pages)}
              >
                Last
              </Link>
            </li>
          </ul>
        </div>
        <Content
          pageNumber={currentPage}
          dataLength={data.length}
          data={data}
          perPage={perPage}
        />
      </Router>
    </div>
  );
};

const Page = ({ pageNumber, component }) => {
  return <Route path={`/${pageNumber}`} component={component} />;
};

const Content = ({ perPage = 6, pageNumber, dataLength, data }) => {
  // console.log(data[95]);
  let pageRange = [];
  const per_page = 0 + perPage;
  if ((pageNumber - 1) * perPage + 1 <= dataLength) {
    if (pageNumber * perPage >= dataLength) {
      // console.log(dataLength, pageNumber, perPage, pageNumber * perPage);
      perPage = dataLength - (pageNumber - 1) * perPage;
      // console.log(dataLength, pageNumber, perPage);
    }
    pageRange = [...Array(perPage).keys()].map(i =>
      Math.min(i + (pageNumber - 1) * per_page, dataLength - 1)
    );
  }
  console.log(pageRange);
  const [currentData, setCurrentData] = useState(data);
  console.log(`This is Current Data ::: ${currentData}`);
  console.log(currentData);
  // setCurrentData(data.slice(1, 12));

  return (
    <div className="row">
      {pageRange.map(item => (
        <div className="col-md-6 col-lg-4 item-case" key={item}>
          <div className="img-container">
            <img
              src={data[item].countryInfo.flag}
              alt="Girl in a jacket"
              className="flag-pic"
            />
          </div>
          <div className="Data">
            <h2>
              {data[item].country} ({data[item].continent})
            </h2>
            <h3>Population {data[item].population}</h3>
            <ul>
              <li>
                Total Tests : <span>{data[item].tests}</span>
              </li>
              <li>
                Total Cases : <span>{data[item].cases}</span>
              </li>
              <li>
                Total Deaths : <span>{data[item].deaths}</span>
              </li>
              <li>
                Total Recovered : <span>{data[item].recovered}</span>
              </li>
              <li>
                Today Cases : <span>{data[item].todayCases}</span>
              </li>
              <li>
                Total Deaths : <span>{data[item].todayDeaths}</span>
              </li>
              <li>
                Total Critical Cases : <span>{data[item].critical}</span>
              </li>
              <li>
                Cases Per One Million :{" "}
                <span>{data[item].casesPerOneMillion}</span>
              </li>
              <li>
                Deaths Per One Million :{" "}
                <span>{data[item].deathsPerOneMillion}</span>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export { Container };
