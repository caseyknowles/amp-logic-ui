// AMP Program Library

// Fannie Mae (Manual UW-style example)
export function evaluateFNMA(lead) {
  const { fico, downPaymentPercent, dti, reservesMonths = 0 } = lead;

  const meetsFico = fico >= 620;
  const meetsDown = downPaymentPercent >= 3;
  const meetsDTI = dti <= 45;
  const meetsReserves = reservesMonths >= 2;

  const eligible = meetsFico && meetsDown && meetsDTI && meetsReserves;

  return {
    program: 'Fannie Mae',
    eligible,
    reasons: [
      !meetsFico ? 'FICO below 620' : null,
      !meetsDown ? 'Down payment below 3%' : null,
      !meetsDTI ? 'DTI exceeds 45%' : null,
      !meetsReserves ? 'Reserves < 2 months' : null,
    ].filter(Boolean),
  };
}

// FHA Logic (Front-end + Back-end)
export function evaluateFHA(lead) {
  const { fico, downPaymentPercent, income, housing = 0, otherDebt = 0 } = lead;

  const frontRatio = income > 0 ? (housing / income) * 100 : 0;
  const backRatio = income > 0 ? ((housing + otherDebt) / income) * 100 : 0;

  const meetsFico = fico >= 580;
  const meetsDown = downPaymentPercent >= 3.5;
  const meetsFront = frontRatio <= 46.9;
  const meetsBack = backRatio <= 56.9;

  const eligible = meetsFico && meetsDown && meetsFront && meetsBack;

  return {
    program: 'FHA',
    eligible,
    frontRatio: frontRatio.toFixed(1),
    backRatio: backRatio.toFixed(1),
    reasons: [
      !meetsFico ? 'FICO below 580' : null,
      !meetsDown ? 'Down payment below 3.5%' : null,
      !meetsFront ? 'Housing ratio exceeds 46.9%' : null,
      !meetsBack ? 'Total DTI exceeds 56.9%' : null,
    ].filter(Boolean),
  };
}

// VA Logic (only Back-end DTI, no MI, lenient FICO)
export function evaluateVA(lead) {
  const { fico, income, housing = 0, otherDebt = 0 } = lead;

  const dti = income > 0 ? ((housing + otherDebt) / income) * 100 : 0;

  const meetsFico = fico >= 580;
  const meetsDTI = dti <= 60;

  const eligible = meetsFico && meetsDTI;

  return {
    program: 'VA',
    eligible,
    dti: dti.toFixed(1),
    reasons: [
      !meetsFico ? 'FICO below 580' : null,
      !meetsDTI ? 'Total DTI exceeds 60%' : null,
    ].filter(Boolean),
  };
}

// Change Wholesale Logic (Non-QM Tier 1)
export function evaluateChange(lead) {
  const { fico, downPaymentPercent, income, housing = 0, otherDebt = 0 } = lead;

  const dti = income > 0 ? ((housing + otherDebt) / income) * 100 : 0;

  const meetsFico = fico >= 640;
  const meetsDown = downPaymentPercent >= 10;
  const meetsDTI = dti <= 55;

  const eligible = meetsFico && meetsDown && meetsDTI;

  return {
    program: 'Change Wholesale',
    eligible,
    dti: dti.toFixed(1),
    reasons: [
      !meetsFico ? 'FICO below 640' : null,
      !meetsDown ? 'Down payment below 10%' : null,
      !meetsDTI ? 'Total DTI exceeds 55%' : null,
    ].filter(Boolean),
  };
}

