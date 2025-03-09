import * as cheerio from "cheerio";
import { Element as DomHandlerElement } from "domhandler";
import { TableRow, TableParseResult } from "../../utils/TableRow";
import { tableUtils } from "../../utils/tableUtils";

export class LeumiStatementParser {
  private $: cheerio.CheerioAPI;

  constructor(html: string) {
    this.$ = cheerio.load(html);
  }

  private parseCreditCardTable(table: DomHandlerElement): TableParseResult {
    const $table = this.$(table);
    const headers = tableUtils.extractHeaders(this.$, $table.find("tr").eq(1).find("td"));

    const rows = $table
      .find("tr")
      .slice(2)
      .toArray()
      .map((tr) => tableUtils.rowToObject(this.$, this.$(tr).find("td"), headers));

    return { headers, rows };
  }

  parseCreditCardTransactions(): TableRow[] {
    const tables = this.$('table[style*="border: 1px solid #808080"]');
    if (!tables.length) {
      throw new Error(`No credit card tables found in statement`);
    }

    const allRows = [...tables].flatMap((table) => this.parseCreditCardTable(table).rows);

    return allRows.filter((row) => row.שם_בית_העסק);
  }

  parseCheckingAccountTransactions(): TableRow[] {
    const headerRow = this.$("tr").find("td.xlHeader").first().parent();
    if (!headerRow.length) {
      throw new Error("No header row found in checking account statement");
    }

    const headers = tableUtils.extractHeaders(this.$, headerRow.find("td.xlHeader"));

    const rows: TableRow[] = [];
    headerRow.nextAll("tr").each((_, row) => {
      const cells = this.$(row).find("td");
      if (cells.length === headers.length) {
        rows.push(tableUtils.rowToObject(this.$, cells, headers));
      }
    });

    return rows;
  }

  extractAccountNumber(): string {
    const pElement = this.$('p:contains("מס\' חשבון")');
    const accountNumberPattern = /מס' חשבון.*?([\d\-/]+)/s;
    const match = pElement.text().match(accountNumberPattern);

    if (!match?.[1]) {
      throw new Error("Account number not found");
    }

    return match[1].trim();
  }
}
