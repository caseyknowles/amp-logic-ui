import {
  evaluateFNMA,
  evaluateFHA,
  evaluateVA,
  evaluateChange
} from './programMatrix';

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return parseFloat(urlParams.get(name)) || 0;
}

function LeadScoringStandalone() {
  const lead = {
    fico: getQueryParam('fico'),
    downPaymentPercent: getQueryParam('down'),
    income: getQueryParam('income'),
    housing: getQueryParam('housing'),
    otherDebt: getQueryParam('debt'),
    reservesMonths: getQueryParam('reserves'),
  };

  const programs = [
    evaluateFNMA(lead),
    evaluateFHA(lead),
    evaluateVA(lead),
    evaluateChange(lead),
  ];

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>🤖 AMP Eligibility Summary</h1>
      <ul>
        <li>FICO: {lead.fico}</li>
        <li>Income: ${lead.income}</li>
        <li>Down: {lead.downPaymentPercent}%</li>
        <li>Housing: ${lead.housing}</li>
        <li>Other Debt: ${lead.otherDebt}</li>
        <li>Reserves: {lead.reservesMonths} months</li>
      </ul>

      <h2 style={{ marginTop: 30 }}>Program Matches</h2>
      {programs.map((program, i) => (
        <div
          key={i}
          style={{
            background: program.eligible ? '#e6ffed' : '#ffe6e6',
            border: `2px solid ${program.eligible ? '#00aa00' : '#cc0000'}`,
            borderRadius: 8,
            padding: 20,
            marginBottom: 20,
          }}
        >
          <h3>{program.program}</h3>
          <p>Status: {program.eligible ? '✅ Eligible' : '❌ Not Eligible'}</p>
          {!program.eligible && program.reasons?.length > 0 && (
            <details>
              <summary>📄 View Reasons</summary>
              <ul>
                {program.reasons.map((r, idx) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
            </details>
          )}
        </div>
      ))}
    </div>
  );
}

export default LeadScoringStandalone;
