export function evaluateLead(lead) {
  const {
    fico,
    downPaymentPercent,
    income,
    housing = 0,
    otherDebt = 0,
  } = lead;

  const dti = income > 0 ? ((housing + otherDebt) / income) * 100 : 0;

  const abilityScore =
    (fico >= 620 ? 1 : 0) +
    (downPaymentPercent >= 3 ? 1 : 0) +
    (dti <= 50 ? 1 : 0);

  let result;
  if (abilityScore === 3) {
    result = 'Prequalified';
  } else if (abilityScore === 2) {
    result = 'Workable with Strategy';
  } else {
    result = 'Not Ready';
  }

  return {
    result,
    dti: dti.toFixed(1),
    abilityScore,
  };
}

