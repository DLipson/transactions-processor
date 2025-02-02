import { Stack, Typography, styled } from "@mui/material";

const StyledInput = styled("input")({
  display: "none",
});

const FileButton = styled("label")(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  padding: "0.5rem 1rem",
  borderRadius: "9999px",
  fontSize: "0.875rem",
  fontWeight: 600,
  backgroundColor: theme.palette.primary.main + "0a",
  color: theme.palette.primary.main,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.primary.main + "1a",
  },
}));

interface StatementFileInputProps {
  index: number;
  file: File | null;
  onFileChange: (index: number, file: File) => void;
}

export const StatementFileInput: React.FC<StatementFileInputProps> = ({
  index,
  file,
  onFileChange,
}) => {
  return (
    <Stack flex={1} spacing={1}>
      <Typography variant="body2" fontWeight={500} color="grey.700">
        Statement File
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <StyledInput
          type="file"
          id={`file-upload-${index}`}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFileChange(index, file);
          }}
          accept=".csv,.pdf,.xlsx,.xls"
        />
        <FileButton htmlFor={`file-upload-${index}`}>Choose File</FileButton>
        {file && (
          <Typography variant="body2" color="grey.500">
            {file.name}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
