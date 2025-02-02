import { Container, Typography, Stack } from "@mui/material";
import { FileUploadForm } from "./FileUploadForm";
import { RawStatementFile } from "../../../domain/fileProcessing/RawStatementFile";
import { processStatementFiles } from "../../../domain/fileProcessing/processStatementFiles";
import { useStatements } from "../../context/useStatements";
import TransactionGrid from "../TransactionView/TransactionGrid";

export const FileProcessingContainer: React.FC = () => {
  const context = useStatements();
  const handleFileUpload = async (files: RawStatementFile[]) => {
    console.log("Processing files:", files);

    const statements = await processStatementFiles(files);
    statements.forEach((statement) => {
      const transactions = statement.statementItems.map((item) =>
        item.toTransactionItem()
      );
      context.addStatement(statement);
      context.addTransactions(statement.id, transactions);
    });

    console.log("Processed statements:", statements);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" color="grey.900" mb={4}>
        Statement Processing System
      </Typography>

      <Stack spacing={4}>
        <section>
          <Typography
            variant="h6"
            fontWeight="semibold"
            color="grey.900"
            mb={2}
          >
            Upload Statements
          </Typography>
          <FileUploadForm onSubmit={handleFileUpload} />
        </section>
        <section>
          <TransactionGrid
            transactions={Object.values(context.transactions)}
            onClearTransactions={() => context.clearTransactions()}
          />
        </section>
      </Stack>
    </Container>
  );
};
