import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();
  const [country, setCountry] = useState("Ho Chi Minh");

  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}&country=${country}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  console.log(data);

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort, country]);

  const apply = () => {
    refetch();
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <div className="gigs">
      <div className="container">
        {/* <span className="breadcrumbs">Liverr {">"} Graphics {"&"} Design {">"}</span> */}
        <h1>Candidate</h1>
        <p>
          Choose your best match
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget:</span>
            <span>From <input ref={minRef} type="number" placeholder="min" /></span>
            <span> To <input ref={maxRef} type="number" placeholder="max" /></span>
            {/* <span> Location: </span>
            <select id="city-select" value={country} onChange={handleCountryChange}>
              <option value="Ho Chi Minh">Ho Chi Minh</option>
              <option value="Ha Noi">Ha Noi</option>
              <option value="Da Nang">Da Nang</option>
            </select> */}
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading
            ? "loading"
            : error
            ? "Something went wrong!"
            : data.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
