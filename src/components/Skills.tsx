import { skillGroups } from '../data/skills'
import './Skills.css'

/**
 * A technical inventory rather than a set of cards: each group is a row with a
 * mono label in a narrow column and its technologies inlined after it, separated
 * by hairlines. No percentages, no bars — nothing that implies a level.
 */
export function Skills() {
  return (
    <div className="skills">
      {skillGroups.map((group) => (
        <div className="skills__group depth-scene depth-object depth-lift" key={group.label}>
          <h3 className="skills__label depth-xs">{group.label}</h3>

          <ul className="skills__items">
            {group.items.map((item) => (
              <li className="skills__item" key={item}>
                <span className="skills__tech depth-lift">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
