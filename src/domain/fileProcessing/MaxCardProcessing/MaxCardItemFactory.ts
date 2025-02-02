import { MaxCardItem } from "../../types/statements/MaxCardItem";
import { ParsedSheetData } from "./MaxCardSheetParser";
import { arrayToObjectsWithHeaders } from "../../utils/xlsxUtils";
import { removeCommaAndParseFloat } from "../../utils";

export class MaxCardItemFactory {
  createItems(parsedData: ParsedSheetData[]): MaxCardItem[] {
    return parsedData.flatMap((sheetData) =>
      this.createItemsFromSheet(sheetData)
    );
  }

  private createItemsFromSheet(sheetData: ParsedSheetData): MaxCardItem[] {
    return arrayToObjectsWithHeaders(
      sheetData.transactions,
      sheetData.headers
    ).map((item) => this.createItem(item as Record<keyof MaxCardItem, string>));
  }

  private createItem(data: Record<keyof MaxCardItem, string>): MaxCardItem {
    return new MaxCardItem(
      data.תאריך_עסקה,
      data.שם_בית_העסק,
      data.קטגוריה,
      data.ספרות_אחרונות_של_כרטיס_האשראי,
      data.סוג_עסקה,
      removeCommaAndParseFloat(data.סכום_חיוב),
      data.מטבע_חיוב_העסקה,
      removeCommaAndParseFloat(data.סכום_עסקה_מקורי),
      data.מטבע_עסקה_מקורי,
      data.תאריך_חיוב,
      data.הערות,
      data.תיוגים,
      data.מועדון_הנחות,
      data.מפתח_דיסקונט,
      data.אופן_ביצוע_העסקה,
      data.שער_המרה_ממטבע_מקור_התחשבנות_לשח
    );
  }
}
