const EXCEEDING_LIMIT_VALUE = 1.79769313 * Math.pow(10, 308);

export function formatShortNumber(number: number | string | bigint | undefined | null, decimals: number = 2): string {
  let value = Number(number || 0);
  if (!number) {
    return '0';
  }

  if (value < 1) {
    return Number(value.toFixed(decimals)).toString();
  }

  // Special case: Exceeding limits
  if (value > EXCEEDING_LIMIT_VALUE) {
    return '999cz';
  }

  // Define suffixes for standard and extended notation
  const standardSuffixes = ['', 'K', 'M', 'B', 'T'];
  const extendedSuffixes = [];
  const englishAlphabetLength = 26;
  const firstCharacterASCIICode = 97;
  for (let i = 0; i < englishAlphabetLength; i++) {
    for (let j = 0; j < englishAlphabetLength; j++) {
      extendedSuffixes.push(
        String.fromCharCode(firstCharacterASCIICode + i) + String.fromCharCode(firstCharacterASCIICode + j)
      );
    }
  }

  // Determine the suffix and calculate the formatted value
  let suffix = '';
  let formattedValue = value;

  if (value < 1000) {
    suffix = '';
  } else if (value < 1e15) {
    // Standard notation (K, M, B, T)
    let exponent = Math.floor(Math.log10(value) / 3);
    exponent = Math.min(exponent, standardSuffixes.length - 1);
    suffix = standardSuffixes[exponent];
    formattedValue = value / Math.pow(10, exponent * 3);
  } else {
    // Extended notation (aa, ab, ac, ..., cz)
    let exponent = Math.floor(Math.log10(value) / 3);
    exponent -= 4; // Since 1aa = 1e15 (10^15)
    if (exponent >= extendedSuffixes.length) {
      return '999cz';
    }
    suffix = extendedSuffixes[exponent];
    formattedValue = value / Math.pow(10, (exponent + 4) * 3);
  }

  // Limit to 2 decimal places
  formattedValue = parseFloat(formattedValue.toFixed(2));

  return `${formattedValue}${suffix}`;
}

export function formatNumber(
  number: number | bigint | string | undefined | null,
  config: {
    maxLength?: number;
    decimals?: number;
    limitNoShortNumber?: number;
  } = { maxLength: 10, decimals: 2, limitNoShortNumber: 100_000_000 }
): string {
  // Convert the number to a string
  if (Number(number) < 0.000001) {
    return '0';
  }
  if (Number(number) > Number(config?.limitNoShortNumber)) {
    return formatShortNumber(number);
  }
  const numberString = Number(Number(number || 0).toFixed(config?.decimals)).toString();
  // Split the string into integer and decimal parts
  const parts = numberString.split('.');
  // Add commas to the integer part
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Check if the total length exceeds the specified maxLength
  const totalLength = parts.join('').length;
  if (totalLength > Number(config?.maxLength || 10)) {
    // Truncate the decimal part to fit within the maxLength
    let remainingLength = Number(config?.maxLength || 10) - parts[0].length;
    if (remainingLength < 0) {
      remainingLength = 0;
    }
    parts[1] = parts[1]?.substring?.(0, remainingLength).replace(/([1-9])0+/g, '$1');
  }
  // Join the parts with a dot and check if the result ends with a dot
  let result = /^0+$/.test(parts[1]) ? parts[0] : parts.join('.');
  if (result.endsWith('.')) {
    result = result.slice(0, -1); // Remove the trailing dot
  }

  // Display the result
  return result;
}
