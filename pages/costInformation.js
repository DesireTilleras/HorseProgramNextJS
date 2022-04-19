/* eslint-disable react/jsx-key */
import React from "react";
import { getAllCostsForFarm } from "../utils/db_costs";
import { useTable, useSortBy } from "react-table";
import { StyledTable } from "../components/Styled/StyledTable";

export default function Home({ allCosts }) {

  const data = React.useMemo(    
    () => allCosts &&
      allCosts.map((costInfo) => {     
        
        const horseName = costInfo.horse.name;
        const costTitle = costInfo.cost.costTitle;
        const amount = costInfo.cost.cost;
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  console.log(allCosts);
  return (
    <div>
      <StyledTable>
        <table {...getTableProps()} className="table-wrapper">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    key={index}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    onClick={() => column.toggleSortBy(!column.isSortedDesc)}
                    className="table-columns"
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ("")}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr key={index} {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    return (
                      <td
                        key={index}
                        {...cell.getCellProps()}
                        className="table-rows"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </StyledTable>
    </div>
  );
}

export async function getServerSideProps() {
  const allCosts = await getAllCostsForFarm("Lilledal");

  // Pass data to the page via props
  return { props: { allCosts } };
}
