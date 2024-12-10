export const numberToWords = (num) => {
    if (num === 0) return "Zero";
  
    const ones = [
      "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    ];
    const tens = [
      "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety",
    ];
    const teens = [
      "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen",
    ];
  
    let word = "";
  
    if (num >= 1000) {
      word += numberToWords(Math.floor(num / 1000)) + " Thousand ";
      num %= 1000;
    }
    if (num >= 100) {
      word += numberToWords(Math.floor(num / 100)) + " Hundred ";
      num %= 100;
    }
    if (num >= 20) {
      word += tens[Math.floor(num / 10)] + " ";
      num %= 10;
    }
    if (num > 0) {
      word += (num < 10 ? ones[num] : teens[num - 10]) + " ";
    }
  
    return word.trim();
  };
  