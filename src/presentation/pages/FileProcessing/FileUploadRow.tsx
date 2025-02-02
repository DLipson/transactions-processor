import { X } from "lucide-react";
import { Paper, Stack, IconButton } from "@mui/material";
import { StatementType } from "../../../domain/types/statements/StatementType";
import { StatementFileInput } from "./StatementFileInput";
import { StatementTypeSelect } from "./StatementTypeSelect";

interface FileUploadRowProps {
  index: number;
  file: File | null;
  statementType: StatementType | undefined;
  onFileChange: (index: number, file: File) => void;
  onTypeChange: (index: number, type: StatementType) => void;
  onRemove: (index: number) => void;
}

export const FileUploadRow: React.FC<FileUploadRowProps> = ({
  index,
  file,
  statementType,
  onFileChange,
  onTypeChange,
  onRemove,
}) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <StatementFileInput
          index={index}
          file={file}
          onFileChange={onFileChange}
        />
        <StatementTypeSelect
          index={index}
          statementType={statementType}
          onTypeChange={onTypeChange}
        />
        <IconButton
          onClick={() => onRemove(index)}
          sx={{ color: "grey.400", "&:hover": { color: "grey.600" } }}
        >
          <X size={20} />
        </IconButton>
      </Stack>
    </Paper>
  );
};
