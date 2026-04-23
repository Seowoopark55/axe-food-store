const ORDER_SHEET_NAME = "주문접수";
const SALES_SUMMARY_SHEET_NAME = "매출정리";
const SALES_DB_SHEET_NAME = "매출DB";
const STATUS_SHEET_NAME = "운영상태";
const GMAIL_NOTIFICATION_TO = "LAC.AXE.MALL@Gmail.com";

function formatKoreanDateTime(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const period = hours < 12 ? "오전" : "오후";
  let displayHour = hours % 12;
  if (displayHour === 0) displayHour = 12;

  return `${month}/${day} ${period} ${displayHour}:${minutes}`;
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getStoreStatusData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(STATUS_SHEET_NAME);

  const defaults = {
    status: "OPEN",
    title: "현재 주문 가능합니다",
    message: "즉시 제작 및 전달이 가능합니다.",
    notice: ""
  };

  if (!sheet) {
    return defaults;
  }

  const values = sheet
    .getRange(1, 1, Math.max(sheet.getLastRow(), 4), 2)
    .getValues();

  const result = { ...defaults };

  values.forEach((row) => {
    const key = String(row[0] || "").trim().toUpperCase();
    const value = String(row[1] || "").trim();

    if (key === "STATUS" && value) result.status = value.toUpperCase();
    if (key === "TITLE") result.title = value;
    if (key === "MESSAGE") result.message = value;
    if (key === "NOTICE") result.notice = value;
  });

  if (!["OPEN", "RESERVE", "CLOSED"].includes(result.status)) {
    result.status = "OPEN";
  }

  return result;
}

function doGet() {
  try {
    const result = getStoreStatusData();

    return ContentService
      .createTextOutput(
        JSON.stringify({
          result: "success",
          status: result.status,
          title: result.title,
          message: result.message,
          notice: result.notice
        })
      )
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(
        JSON.stringify({
          result: "error",
          message: error.message
        })
      )
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getItemMap(data) {
  const items = {
    "라면": 0,
    "프라이드 치킨": 0,
    "계란 샐러드": 0,
    "계란 마요 토스트": 0,
    "무난한 딸기우유": 0,
    "브라우니": 0,
    "까눌레": 0,
    "마카롱": 0,
    "밀크티": 0,
    "아이스 마끼아또": 0
  };

  if (Array.isArray(data.items)) {
    data.items.forEach((item) => {
      if (item && Object.prototype.hasOwnProperty.call(items, item.name)) {
        items[item.name] = Number(item.quantity) || 0;
      }
    });
  }

  return items;
}

function applyCheckboxes(sheet, row) {
  const checkboxRange = sheet.getRange(row, 17, 1, 3);
  checkboxRange.clearDataValidations();
  checkboxRange.clearContent();
  checkboxRange.insertCheckboxes();
  checkboxRange.setValues([[false, false, false]]);
}

function writeOrderRow(sheet, row, rowValues, copyFormatFromRow) {
  if (copyFormatFromRow >= 2) {
    sheet
      .getRange(copyFormatFromRow, 1, 1, sheet.getLastColumn())
      .copyTo(
        sheet.getRange(row, 1, 1, sheet.getLastColumn()),
        SpreadsheetApp.CopyPasteType.PASTE_FORMAT,
        false
      );
  }

  sheet.getRange(row, 1, 1, rowValues.length).setValues([rowValues]);
  applyCheckboxes(sheet, row);
}

function buildOrderSummaryText(items) {
  const lines = [];

  if (items["라면"] > 0) lines.push(`- 라면 ${items["라면"]}세트`);
  if (items["프라이드 치킨"] > 0) lines.push(`- 프라이드 치킨 ${items["프라이드 치킨"]}세트`);
  if (items["계란 샐러드"] > 0) lines.push(`- 계란 샐러드 ${items["계란 샐러드"]}세트`);
  if (items["계란 마요 토스트"] > 0) lines.push(`- 계란 마요 토스트 ${items["계란 마요 토스트"]}세트`);
  if (items["무난한 딸기우유"] > 0) lines.push(`- 무난한 딸기우유 ${items["무난한 딸기우유"]}세트`);
  if (items["브라우니"] > 0) lines.push(`- 브라우니 ${items["브라우니"]}세트`);
  if (items["까눌레"] > 0) lines.push(`- 까눌레 ${items["까눌레"]}세트`);
  if (items["마카롱"] > 0) lines.push(`- 마카롱 ${items["마카롱"]}세트`);
  if (items["밀크티"] > 0) lines.push(`- 밀크티 ${items["밀크티"]}세트`);
  if (items["아이스 마끼아또"] > 0) lines.push(`- 아이스 마끼아또 ${items["아이스 마끼아또"]}세트`);

  return lines.length > 0 ? lines.join("\n") : "- 주문 항목 없음";
}

function sendGmailOrderNotification(orderNumber, data, items, totalPrice) {
  const orderSummary = buildOrderSummaryText(items);
  const memoText =
    data.memo && String(data.memo).trim() !== ""
      ? String(data.memo).trim()
      : "없음";

  const subject = `[AXE FOOD] 새 주문 접수 - ${orderNumber}`;

  const body =
    "새로운 주문이 접수되었습니다.\n\n" +
    `주문번호: ${orderNumber}\n` +
    `고객명: ${data.customerName || ""}\n` +
    `연락처: ${data.contact || ""}\n\n` +
    `주문내용:\n${orderSummary}\n\n` +
    `총금액: ${Number(totalPrice).toLocaleString("ko-KR")}원\n\n` +
    `메모: ${memoText}`;

  MailApp.sendEmail({
    to: GMAIL_NOTIFICATION_TO,
    subject: subject,
    body: body
  });
}

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(ORDER_SHEET_NAME);

    if (!sheet) {
      throw new Error("주문접수 시트를 찾을 수 없습니다.");
    }

    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("전송된 주문 데이터가 없습니다.");
    }

    const data = JSON.parse(e.postData.contents);
    const items = getItemMap(data);

    const lastRow = sheet.getLastRow();
    const newRow = lastRow + 1;
    const orderNumber = "W-" + String(Math.max(1, newRow - 1)).padStart(4, "0");
    const nowText = formatKoreanDateTime(new Date());

    const rowValues = [
      nowText,
      orderNumber,
      data.customerName || "",
      data.contact || "",
      data.memo || "",
      items["라면"],
      items["프라이드 치킨"],
      items["계란 샐러드"],
      items["계란 마요 토스트"],
      items["무난한 딸기우유"],
      items["브라우니"],
      items["까눌레"],
      items["마카롱"],
      items["밀크티"],
      items["아이스 마끼아또"],
      Number(data.totalPrice) || 0,
      false,
      false,
      false
    ];

    writeOrderRow(sheet, newRow, rowValues, lastRow);
    sendGmailOrderNotification(
      orderNumber,
      data,
      items,
      Number(data.totalPrice) || 0
    );

    return ContentService
      .createTextOutput(
        JSON.stringify({
          result: "success",
          orderNumber: orderNumber
        })
      )
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(
        JSON.stringify({
          result: "error",
          message: error.message
        })
      )
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function testWrite() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(ORDER_SHEET_NAME);

  if (!sheet) {
    throw new Error("주문접수 시트를 찾을 수 없습니다.");
  }

  const lastRow = sheet.getLastRow();
  const newRow = lastRow + 1;
  const nowText = formatKoreanDateTime(new Date());

  const rowValues = [
    nowText,
    "W-TEST",
    "테스트",
    "1111",
    "테스트 메모",
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    3000,
    false,
    false,
    false
  ];

  writeOrderRow(sheet, newRow, rowValues, lastRow);
}

function testGmailNotification() {
  const testData = {
    customerName: "테스트주문자",
    contact: "1234",
    memo: "Gmail 테스트"
  };

  const testItems = {
    "라면": 1,
    "프라이드 치킨": 1,
    "계란 샐러드": 0,
    "계란 마요 토스트": 0,
    "무난한 딸기우유": 1,
    "브라우니": 0,
    "까눌레": 0,
    "마카롱": 0,
    "밀크티": 1,
    "아이스 마끼아또": 1
  };

  sendGmailOrderNotification("W-TEST", testData, testItems, 4100);
}

function saveDailySales() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const summarySheet = ss.getSheetByName(SALES_SUMMARY_SHEET_NAME);
  const dbSheet = ss.getSheetByName(SALES_DB_SHEET_NAME);

  if (!summarySheet) {
    throw new Error("매출정리 시트를 찾을 수 없습니다.");
  }

  if (!dbSheet) {
    throw new Error("매출DB 시트를 찾을 수 없습니다.");
  }

  const now = new Date();
  const targetDate = new Date(now);
  targetDate.setDate(targetDate.getDate() - 1);

  const dateKey = formatDateKey(targetDate);

  const rowCount = Math.max(dbSheet.getLastRow() - 1, 0);
  const existingDates =
    rowCount > 0
      ? dbSheet.getRange(2, 1, rowCount, 1).getValues().flat()
      : [];

  const alreadySaved = existingDates.some((value) => {
    if (!value) return false;

    if (
      Object.prototype.toString.call(value) === "[object Date]" &&
      !isNaN(value)
    ) {
      return formatDateKey(value) === dateKey;
    }

    return String(value).trim() === dateKey;
  });

  if (alreadySaved) {
    Logger.log("이미 저장된 날짜입니다: " + dateKey);
    return;
  }

  const sales = summarySheet.getRange("B2").getValue();
  const cost = summarySheet.getRange("B3").getValue();
  const profit = summarySheet.getRange("B4").getValue();
  const memo = summarySheet.getRange("B5").getValue();

  dbSheet.appendRow([
    dateKey,
    Number(sales) || 0,
    Number(cost) || 0,
    Number(profit) || 0,
    memo || ""
  ]);

  Logger.log("매출DB 저장 완료: " + dateKey);
}

function testSaveDailySales() {
  saveDailySales();
}
