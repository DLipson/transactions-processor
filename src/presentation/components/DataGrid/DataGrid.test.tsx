import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DataGrid } from "./DataGrid";
import { describe, test, expect } from "vitest";

interface TestData {
  id: number;
  name: string;
  age: number;
  salary: number;
}

const sampleData: TestData[] = [
  { id: 1, name: "Alice", age: 30, salary: 70000 },
  { id: 2, name: "Bob", age: 25, salary: 50000 },
];

describe("DataGrid Component", () => {
  test("renders all properties as columns by default", () => {
    render(<DataGrid data={sampleData} />);

    expect(screen.getByText("Id")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("Salary")).toBeInTheDocument();
  });

  test("excludes specified properties from columns", () => {
    render(<DataGrid data={sampleData} excludeFields={["salary"]} />);

    expect(screen.queryByText("Salary")).not.toBeInTheDocument();
  });

  test("applies custom column configurations", () => {
    const customColumnConfigs = {
      salary: {
        headerName: "Annual Salary",
        valueFormatter: (value: number) => {
          return `$${value.toFixed(2)}`;
        },
        width: 150,
      },
    };

    render(
      <DataGrid data={sampleData} customColumnConfigs={customColumnConfigs} />
    );

    expect(screen.getByText("Annual Salary")).toBeInTheDocument();
  });

  test("adds custom columns not present in data properties", () => {
    const additionalColumns = [
      {
        field: "actions",
        headerName: "Actions",
        renderCell: () => <button>Click Me</button>,
      },
    ];

    render(
      <DataGrid data={sampleData} additionalColumns={additionalColumns} />
    );

    expect(screen.getByText("Actions")).toBeInTheDocument();
    expect(screen.getAllByText("Click Me").length).toBe(sampleData.length);
  });
});
