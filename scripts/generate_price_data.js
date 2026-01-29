const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'src', 'assets', 'generated');
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, 'price_time_data.json');

const config = {
  minPrice: 224,
  maxPrice: 242,
  peakPrice: 899,
  riseStartDayOffset: 248,
  peakDayOffset: 339,
  microPeakDayOffset: 353,
  microPeakHeight: 50,
  changeProb: 0.85,
  targetMargin: 0.05,
  exponentialPower: 2.5
};

function getMicroNoise(day) {
  const wave1 = Math.sin(day * 0.3) * 0.4;
  const wave2 = Math.sin(day * 0.7 + 1.5) * 0.3;
  const wave3 = Math.sin(day * 1.2 + 3.7) * 0.2;
  return wave1 + wave2 + wave3;
}

function roundToLogical(price) {
  const logicalPrices = [
    0.00, 0.50, 0.95, 0.99,
    3.00, 3.50, 3.95, 3.99,
    5.00, 5.50, 5.95, 5.99,
    7.00, 7.50, 7.95, 7.99,
    9.00, 9.50, 9.95, 9.99
  ];
  const wholeTens = Math.floor(price / 10) * 10;
  const remainder = price - wholeTens;
  let closestEnding = logicalPrices[0];
  let minDiff = Math.abs(remainder - logicalPrices[0]);
  for (let ending of logicalPrices) {
    const diff = Math.abs(remainder - ending);
    if (diff < minDiff) {
      minDiff = diff;
      closestEnding = ending;
    }
  }
  return +(wholeTens + closestEnding).toFixed(2);
}

function generateData() {
  const result = [];
  const startDate = new Date('2025-01-01');
  const endDate = new Date('2026-01-01');

  const riseStartDate = new Date(startDate);
  riseStartDate.setDate(riseStartDate.getDate() + config.riseStartDayOffset);
  const riseEndDate = new Date(startDate);
  riseEndDate.setDate(riseEndDate.getDate() + config.peakDayOffset);
  const microPeakDate = new Date(startDate);
  microPeakDate.setDate(microPeakDate.getDate() + config.microPeakDayOffset);

  let currentValue = 233;
  function getIncrementalNoise(targetValue) {
    if (Math.random() > config.changeProb) {
      const targetWithMargin = targetValue * config.targetMargin;
      const lowerBound = Math.min(currentValue, targetValue - targetWithMargin);
      const upperBound = Math.max(currentValue, targetValue + targetWithMargin);
      currentValue = lowerBound + Math.random() * (upperBound - lowerBound);
    }
    return currentValue;
  }

  let currentDate = new Date(startDate);
  let dayCounter = 0;

  // Phase 1
  while (currentDate < riseStartDate) {
    const targetPrice = config.minPrice + Math.random() * (config.maxPrice - config.minPrice);
    const basePrice = getIncrementalNoise(targetPrice);
    const microNoise = getMicroNoise(dayCounter);
    const price = roundToLogical(basePrice + microNoise);
    result.push({ date: currentDate.toISOString().split('T')[0], price });
    currentDate.setDate(currentDate.getDate() + 1);
    dayCounter++;
  }

  // Phase 2: rise
  currentDate = new Date(riseStartDate);
  const daysInRisePeriod = Math.floor((riseEndDate - riseStartDate) / (1000 * 60 * 60 * 24)) || 1;
  let dayIndex = 0;
  while (currentDate <= riseEndDate) {
    const progress = dayIndex / daysInRisePeriod;
    const targetPrice = 233 + (config.peakPrice - 233) * Math.pow(progress, config.exponentialPower);
    const basePrice = getIncrementalNoise(targetPrice);
    const microNoise = getMicroNoise(dayCounter);
    const price = roundToLogical(basePrice + microNoise);
    result.push({ date: currentDate.toISOString().split('T')[0], price });
    currentDate.setDate(currentDate.getDate() + 1);
    dayIndex++;
    dayCounter++;
  }

  // Phase 3: flat until micro peak
  const flatStartDate = new Date(riseEndDate);
  flatStartDate.setDate(flatStartDate.getDate() + 1);
  currentDate = new Date(flatStartDate);
  while (currentDate < microPeakDate) {
    const targetPrice = config.peakPrice;
    const basePrice = getIncrementalNoise(targetPrice);
    const price = roundToLogical(basePrice + getMicroNoise(dayCounter));
    result.push({ date: currentDate.toISOString().split('T')[0], price });
    currentDate.setDate(currentDate.getDate() + 1);
    dayCounter++;
  }

  // Micro peak
  const microPeakStart = new Date(microPeakDate);
  currentDate = new Date(microPeakStart);
  const microPeakDays = 3;
  for (let i = 0; i < microPeakDays && currentDate <= endDate; i++) {
    const peakProgress = i / (microPeakDays - 1);
    const peakMultiplier = Math.sin(peakProgress * Math.PI);
    const additionalStep = config.microPeakHeight * peakMultiplier;
    const targetPrice = config.peakPrice + additionalStep;
    const basePrice = getIncrementalNoise(targetPrice);
    const price = roundToLogical(basePrice + getMicroNoise(dayCounter));
    result.push({ date: currentDate.toISOString().split('T')[0], price });
    currentDate.setDate(currentDate.getDate() + 1);
    dayCounter++;
  }

  // Phase 4: return to flat (with step)
  while (currentDate <= endDate) {
    const targetPrice = config.peakPrice + config.microPeakHeight;
    const basePrice = getIncrementalNoise(targetPrice);
    const price = roundToLogical(basePrice + getMicroNoise(dayCounter));
    result.push({ date: currentDate.toISOString().split('T')[0], price });
    currentDate.setDate(currentDate.getDate() + 1);
    dayCounter++;
  }

  return result;
}

const data = generateData();
fs.writeFileSync(outFile, JSON.stringify(data, null, 2), 'utf8');
console.log('Wrote', outFile, 'with', data.length, 'points');
