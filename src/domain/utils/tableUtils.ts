import * as cheerio from "cheerio";
import { Element as DElement } from "domhandler";

import { TableRow } from "./TableRow";

/**
 * Shared utilities for processing table data
 */
export const tableUtils = {
  /**
   * Converts a header string to a valid object key
   * Preserves Hebrew letters, alphanumeric characters, and underscores
   */
  normalizeHeader: (header: string): string => {
    return header
      .trim()
      .toLowerCase()
      .replace(/[\s/]/g, "_")
      .replace(/[^א-ת\w\s]/g, "");
  },

  /**
   * Converts a row of cells into an object using provided headers
   */
  rowToObject: (
    $: cheerio.CheerioAPI,
    cells: cheerio.Cheerio<DElement>,
    headers: string[]
  ): TableRow => {
    const row: TableRow = {};
    cells.each((i, cell) => {
      if (i < headers.length) {
        row[headers[i]] = $(cell).text().trim();
      }
    });
    return row;
  },

  /**
   * Extracts headers from cells
   */
  extractHeaders: (
    $: cheerio.CheerioAPI,
    headerCells: cheerio.Cheerio<DElement>
  ): string[] => {
    return headerCells
      .map((_, cell) => tableUtils.normalizeHeader($(cell).text()))
      .get();
  },
};
