import SpeakButton from '../SpeakButton.jsx';
import VerbBadge from '../VerbBadge.jsx';
import { chantText } from '../../data/verbs.js';

// One row of the verb table. `hideForms` blurs V2/V3 for self-testing (hover to reveal).
export default function VerbRow({ v, hideForms = false, showNo = false }) {
  const cls = hideForms ? 'form blurred-cell' : 'form';
  return (
    <tr>
      {showNo && <td className="muted">{v.no}</td>}
      <td>
        <b>{v.base}</b>
        {v.note && <div className="muted small">{v.note}</div>}
      </td>
      <td className={cls}>{v.past}</td>
      <td className={cls}>{v.pp}</td>
      <td>{v.meaning}</td>
      <td className="nowrap">
        <SpeakButton text={chantText(v)} /> <VerbBadge base={v.base} />
      </td>
    </tr>
  );
}
