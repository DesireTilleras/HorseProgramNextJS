/* eslint-disable react/jsx-key */
import React from "react";
import { Table } from "../components/Table";
import {Button} from "../components/Button"
import { StyledCostInformation } from "../styles/StyledCostInformation";
import { useRouter } from "next/router";


export default function Home({ allCosts }) {
  let arrayOfYears = [];
    const router = useRouter();

  const getTotaltCost = () => {
    let total = 0;

    allCosts &&
      allCosts.map((costInfo) => {
        total += Number(costInfo.cost.cost);
      });

    return total.toLocaleString();
  };

  const getAllTheYears = () => {
    const result = [
      ...new Set(
        allCosts.map((event) => new Date(event.cost.date).getFullYear())
      ),
    ];

    return result;
  };

  const getCosts = () => {
    getAllTheYears() &&
      getAllTheYears().map((year) => {
        arrayOfYears.push({ year: year, total: getTheCostForYear(year) });
      });

 
  };

  const getTheCostForYear = (year) => {
    let total = 0;

    allCosts &&
      allCosts.map((costInfo) => {
        costInfo.cost.date.startsWith(year)
          ? (total += Number(costInfo.cost.cost))
          : "";
      });
    return total.toLocaleString();
  };


  getCosts();

  const data = React.useMemo(
    () =>
      allCosts &&
      allCosts.map((costInfo) => {
        const horseName = costInfo.horse.name;
        const costTitle = costInfo.cost.costTitle;
        const amount = Number(costInfo.cost.cost).toLocaleString();
        const date = costInfo.cost.date;
        return {
          horse: horseName,
          cost: costTitle,
          amount: amount,
          date: date,
        };
      }),
    [allCosts]
  );
  const columns = React.useMemo(
    () => [
      {
        Header: "Horse",
        accessor: "horse", // accessor is the "key" in the data
      },
      {
        Header: "Cost title",
        accessor: "cost",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Date",
        accessor: "date",
      },
    ],
    []
  );

  const costData = React.useMemo(
    () => [
      {
        total: getTotaltCost(),
      },
    ],
    []
  );
  const costColumns = React.useMemo(
    () => [
      {
        Header: "Total",
        accessor: "total", // accessor is the "key" in the data
      },
    ],
    []
  );

  return (
    <StyledCostInformation>
      <div>
        <Button
          type="button"
          value="Go back to front page"
          onclick={() => router.push("/")}
        ></Button>
      </div>
      <div className="table-wrapper">
        <Table data={costData} columns={costColumns} />
      </div>
      <div className="table-wrapper">
        <Table data={data} columns={columns} />
      </div>
    </StyledCostInformation>
  );
}

export async function getServerSideProps() {

  const res = await fetch(`http://localhost:3000/api/getCosts`);
  const allCosts = await res.json();

  // Pass data to the page via props
  return { props: { allCosts } };
}
