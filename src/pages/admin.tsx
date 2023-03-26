import { useState } from "react";
import ButtonAlt from "../components/ButtonAlt";
import * as d3 from "d3";

const Admin = () => {
  const [viewReport, setViewReport] = useState(0);
  const [data, setData] = useState<any[]>([]);

  const report = async (id: number) => {
    setViewReport(id);
    const response = await fetch("http://localhost:2003/api/report/" + id);
    const fetchData = await response.json();
    console.log(fetchData);
  };

  const showData = () => {
    if (viewReport == 1 && data != null) {
      const margin = { top: 20, right: 20, bottom: 30, left: 50 };
      const width = 960 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      // Set the scales
      const x = d3.scaleBand().range([0, width]).padding(0.1);
      const y = d3.scaleLinear().range([height, 0]);

      // Create the canvas
      const svg = d3
        .select("body")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Set the data for the chart
      x.domain(
        data.map(function (d) {
          return d.month;
        })
      );
      y.domain([
        0,
        d3.max(data, function (d) {
          return d.revenue;
        }),
      ]);

      // Add the x-axis
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Add the y-axis
      svg.append("g").call(d3.axisLeft(y));

      // Add the bars
      svg
        .selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d): any {
          return x(d.month);
        })
        .attr("width", x.bandwidth())
        .attr("y", function (d) {
          return y(d.revenue);
        })
        .attr("height", function (d) {
          return height - y(d.revenue);
        });
    }
  };

  return (
    <>
      <div className="mx-8 mt-32 flex w-full flex-col items-center justify-center">
        <div className="min-w-100 flex flex-row items-center justify-center gap-x-10">
          <ButtonAlt onClick={() => report(1)} view={viewReport} bid={1}>
            Report 1
          </ButtonAlt>
          <ButtonAlt onClick={() => report(2)} view={viewReport} bid={2}>
            Report 2
          </ButtonAlt>
          <ButtonAlt onClick={() => report(3)} view={viewReport} bid={3}>
            Report 3
          </ButtonAlt>
          <ButtonAlt onClick={() => report(4)} view={viewReport} bid={4}>
            Report 4
          </ButtonAlt>
        </div>
        <div className="pt-60">
          {viewReport != 0 && data != null && <>{showData()}</>}
        </div>
      </div>
    </>
  );
};

export default Admin;
