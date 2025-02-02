import React, { useState } from "react";
import { Plus, Upload } from "lucide-react";
import { Button, Stack } from "@mui/material";
import { FileUploadRow } from "./FileUploadRow";
import { StatementType } from "../../../domain/types/statements/StatementType";
import { RawStatementFile } from "../../../domain/fileProcessing/RawStatementFile";

type UploadRow = Omit<RawStatementFile, "statementType"> & {
  statementType: StatementType | undefined;
};
interface FileUploadFormProps {
  onSubmit: (files: RawStatementFile[]) => Promise<void>;
}

export const FileUploadForm: React.FC<FileUploadFormProps> = ({ onSubmit }) => {
  const [rows, setRows] = useState<UploadRow[]>([
    {
      id: crypto.randomUUID(),
      file: null,
      statementType: undefined,
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: crypto.randomUUID(),
        file: null,
        statementType: undefined,
      },
    ]);
  };

  const removeRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const updateFile = (index: number, file: File) => {
    setRows(rows.map((row, i) => (i === index ? { ...row, file } : row)));
  };

  const updateType = (index: number, statementType: StatementType) => {
    setRows(
      rows.map((row, i) => (i === index ? { ...row, statementType } : row))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validRows = rows.filter(
      (row) => row.file !== null && row.statementType !== undefined
    );
    if (validRows.length === 0) return;

    setIsSubmitting(true);
    try {
      await onSubmit(validRows as RawStatementFile[]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {rows.map((row, index) => (
          <FileUploadRow
            key={row.id}
            index={index}
            file={row.file}
            statementType={row.statementType}
            onFileChange={updateFile}
            onTypeChange={updateType}
            onRemove={removeRow}
          />
        ))}

        <Stack direction="row" justifyContent="space-between">
          <Button
            variant="outlined"
            onClick={addRow}
            startIcon={<Plus size={16} />}
          >
            Add Another Statement
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting || !rows.some((row) => row.file)}
            startIcon={<Upload size={16} />}
          >
            {isSubmitting ? "Processing..." : "Upload Statements"}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
