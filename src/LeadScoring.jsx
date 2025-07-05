import {
  evaluateFNMA,
  evaluateFHA,
  evaluateVA,
  evaluateChange
} from './programMatrix';

import { evaluateLead } from './evaluateLead';

function LeadScoring() {
  const sampleLead = {
    fico: 595,
    downPaymentPercent: 3.5,
    income: 5000,
    monthlyDebt: 1800,
    otherDebt: 800
  };

  const score = evaluateLead(sampleLead);
  const fnma = evaluateFNMA({ ...sampleLead, dti: parseFloat(score.dti) });
  const fha = evaluateFHA({ ...sampleLead, dti: parseFloat(score.dti) });
  const va = evaluateVA({ ...sampleLead });
  const change = evaluateChange({ ...sampleLead });


  return (<div style={{ padding: 40, fontFamily: 'sans-serif' }}>
  <h1>✅ LeadScoring Logic Test</h1>
  <h2 style={{ marginTop: 20 }}>🧠 AMP Score: {score.result}</h2>

  {[fnma, fha, va, change].map((program, index) => (
    <div
      key={index}
      style={{
        background: program.eligible ? '#e6ffed' : '#ffe6e6',
        border: `2px solid ${program.eligible ? '#00aa00' : '#cc0000'}`,
        borderRadius: 8,
        padding: 20,
        marginBottom: 20,
      }}
    >
      <h3 style={{ margin: 0 }}>{program.program}</h3>
      <p style={{ fontWeight: 'bold' }}>
        Status: {program.eligible ? '✅ Eligible' : '❌ Not Eligible'}
      </p>
      {!program.eligible && program.reasons?.length > 0 && (
  <details style={{ marginTop: 10 }}>
    <summary style={{ cursor: 'pointer' }}>📄 View Decline Reasons</summary>
    <ul style={{ marginTop: 8 }}>
      {program.reasons.map((reason, i) => (
        <li key={i} style={{ color: '#cc0000' }}>{reason}</li>
      ))}
    </ul>
  </details>
)}

    </div>
  ))}
</div>
);
}

export default LeadScoring;


