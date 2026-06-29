import { IconCheck } from '../icons.jsx'

export default function Checkbox({ id, checked, onChange, children }) {
  return (
    <label className="check" htmlFor={id}>
      <input id={id} type="checkbox" checked={checked} onChange={onChange} />
      <span className="check__box" aria-hidden="true">
        <IconCheck />
      </span>
      <span>{children}</span>
    </label>
  )
}
