/* eslint-disable react/jsx-key */
import React from "react";
import { getAllCostsForFarm } from "../utils/db_costs";
import { useTable, useSortBy } from "react-table";
import { StyledTable } from "../components/Styled/StyledTable";

export default function Home({ allCosts }) {
  const data = React.useMemo(
    () =>
      allCosts.map((costInfo) => {      
        return {          
          horse: <label>{costInfo.horse.name}</label>,
          cost: <label>{costInfo.cost.costTitle}</label>,
          amount: <label>{costInfo.cost.cost}</label>,
          date: <label>{costInfo.cost.date}</label>,
        };
      }),
    []
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
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={column.index}
                    className="table-columns"
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        key={cell.index}
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
