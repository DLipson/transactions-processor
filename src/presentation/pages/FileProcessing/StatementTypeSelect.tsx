import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { StatementType } from "../../../domain/types/statements/StatementType";

interface StatementTypeSelectProps {
  index: number;
  statementType: StatementType | undefined;
  onTypeChange: (index: number, type: StatementType) => void;
}

const LABEL_TEXT = "Statement Type";

export const StatementTypeSelect: React.FC<StatementTypeSelectProps> = ({
  index,
  statementType,
  onTypeChange,
}) => {
  return (
    <FormControl sx={{ width: 200, "& > *": { mt: 1 } }}>
      <InputLabel variant="outlined">{LABEL_TEXT}</InputLabel>
      <Select
        label={LABEL_TEXT}
        value={statementType || ""}
        onChange={(e) => onTypeChange(index, e.target.value as StatementType)}
      >
        <MenuItem value={StatementType.LeumiAccountActivity}>
          Leumi Account Activity
        </MenuItem>
        <MenuItem value={StatementType.LeumiCardsTransactions}>
          Leumi Cards
        </MenuItem>
        <MenuItem value={StatementType.MaxCardsTransactions}>
          Max Cards
        </MenuItem>
      </Select>
    </FormControl>
  );
};
