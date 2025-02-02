import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "../../../../test/test-utils";
import { FileUploadRow } from "../FileUploadRow";
import { StatementType } from "../../../../domain/types/statements/StatementType";

describe("FileUploadRow", () => {
  const defaultProps = {
    index: 0,
    file: null,
    statementType: StatementType.LeumiCardsTransactions,
    onFileChange: vi.fn(),
    onTypeChange: vi.fn(),
    onRemove: vi.fn(),
  };

  it("renders correctly", () => {
    render(<FileUploadRow {...defaultProps} />);

    expect(screen.getByText("Statement File")).toBeInTheDocument();
    expect(screen.getAllByText("Statement Type")[0]).toBeInTheDocument();
    expect(screen.getByText("Choose File")).toBeInTheDocument();
  });

  it("handles file selection", () => {
    render(<FileUploadRow {...defaultProps} />);

    const file = new File(["test"], "test.csv", { type: "text/csv" });
    const input = screen.getByLabelText("Choose File");

    fireEvent.change(input, { target: { files: [file] } });

    expect(defaultProps.onFileChange).toHaveBeenCalledWith(0, file);
  });

  it("handles type change", () => {
    render(<FileUploadRow {...defaultProps} />);

    const select = screen.getByRole("combobox");
    fireEvent.mouseDown(select);

    const option = screen.getByRole("option", { name: "Max Cards" });
    fireEvent.click(option);

    expect(defaultProps.onTypeChange).toHaveBeenCalledWith(0, StatementType.MaxCardsTransactions);
  });

  it("handles remove", () => {
    render(<FileUploadRow {...defaultProps} />);

    const removeButton = screen.getByRole("button");
    fireEvent.click(removeButton);

    expect(defaultProps.onRemove).toHaveBeenCalledWith(0);
  });
});
